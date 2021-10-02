import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Gasto } from '../../interfaces/Gasto';
import { Usuario } from '../../interfaces/Usuario';

@Injectable({
  providedIn: 'root',
})
export class GastoService {
  constructor(private firestore: AngularFirestore) {}

  public getGastos(usuario: Usuario) {
    return this.firestore
      .collection('empresas')
      .doc(usuario.sucursal.idEmpresa.toString())
      .collection('sucursales')
      .doc(usuario.sucursal.idSucursal.toString())
      .collection('gastos')
      .valueChanges();
  }

  public setGasto(usuario: Usuario, gasto: Gasto) {
    return this.firestore
      .collection('empresas')
      .doc(usuario.sucursal.idEmpresa.toString())
      .collection('sucursales')
      .doc(usuario.sucursal.idSucursal.toString())
      .collection('gastos')
      .doc(gasto.idGasto.toString())
      .set(gasto);
  }
}
