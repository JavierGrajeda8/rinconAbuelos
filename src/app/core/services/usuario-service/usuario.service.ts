import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { ConstStrings } from '../../constants/constStrings';
import { Usuario } from '../../interfaces/Usuario';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(
    private storage: StorageService,
    private auth: AuthService,
    private firestore: AngularFirestore
  ) {}

  getEmpresas(idEmpresa) {
    return this.firestore
      .collection('empresas')
      .doc(idEmpresa)
      .get()
      .toPromise();
  }

  getSucursal(idEmpresa, idSucursal) {
    console.log('getSucursal', idEmpresa);
    console.log('getSucursal', idSucursal);
    return this.firestore
      .collection('empresas')
      .doc(idEmpresa)
      .collection('sucursales')
      .doc(idSucursal)
      .get()
      .toPromise();
  }

  getEmpresasAcceso(usuario: Usuario) {
    return this.firestore
      .collection('usuario')
      .doc(usuario.idUsuario)
      .collection('empresas')
      .doc('acceso')
      .get()
      .toPromise();
  }

  getSucursalesAcceso(usuario: Usuario, idEmpresa) {
    return this.firestore
      .collection('empresas')
      .doc(idEmpresa)
      .collection('usuarios')
      .doc(usuario.idUsuario)
      .get()
      .toPromise();
  }

  login(correo, password) {
    return new Promise((resolve, reject) => {
      this.auth
        .loginWithEmailPassword(correo, password)
        .then((data) => {
          this.get(correo)
            .then((user: any) => {
              this.storage.set(
                ConstStrings.str.storage.user,
                JSON.stringify(user.data())
              );
              resolve(user);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  registrar(usuario: Usuario) {
    return new Promise((resolve, reject) => {
      this.auth
        .registerWithEmail(usuario.correo, usuario.password)
        .then(() => {
          delete usuario.password;
          this.firestore
            .collection('usuario')
            .doc(usuario.correo)
            .set(usuario)
            .then(() => {
              this.storage.set(
                ConstStrings.str.storage.user,
                JSON.stringify(usuario)
              );
              resolve(usuario);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  private get(correo) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('usuario')
        .doc(correo)
        .get()
        .toPromise()
        .then((user) => {
          if (user.exists) {
            resolve(user);
          } else {
            reject('No se encontró el usuario en firebase');
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
