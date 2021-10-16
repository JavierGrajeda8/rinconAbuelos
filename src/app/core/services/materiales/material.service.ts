import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ConstStatus } from '../../constants/constStatus';
import { Material } from '../../interfaces/Material';
import { MaterialDetalle } from '../../interfaces/MaterialDetalle';
import { Usuario } from '../../interfaces/Usuario';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  constructor(private firestore: AngularFirestore) {}

  public setMaterial(usuario: Usuario, material: Material) {
    this.firestore
    .collection('materiales')
    .doc(material.idMaterial.toString())
    .set(material);

    return this.firestore
      .collection('empresas')
      .doc(usuario.sucursal.idEmpresa.toString())
      .collection('sucursales')
      .doc(usuario.sucursal.idSucursal.toString())
      .collection('materiales')
      .doc(material.idMaterial.toString())
      .set(material);
  }

  public updateMaterial(usuario: Usuario, idMaterial, cantidad0) {
    console.log('cantidad0', cantidad0);
    const material = this.firestore
      .collection('empresas')
      .doc(usuario.sucursal.idEmpresa.toString())
      .collection('sucursales')
      .doc(usuario.sucursal.idSucursal.toString())
      .collection('materiales')
      .doc(idMaterial.toString());

    material
      .get()
      .toPromise()
      .then((mat) => {
        const matAux = mat.data() as Material;
        matAux.cantidad = matAux.cantidad - cantidad0;
        this.firestore
          .collection('empresas')
          .doc(usuario.sucursal.idEmpresa.toString())
          .collection('sucursales')
          .doc(usuario.sucursal.idSucursal.toString())
          .collection('materiales')
          .doc(idMaterial.toString())
          .set(matAux);
      });
  }

  public deleteMaterial(usuario: Usuario, material: Material) {
    material.estado = ConstStatus.eliminado;
    return this.firestore
      .collection('empresas')
      .doc(usuario.sucursal.idEmpresa.toString())
      .collection('sucursales')
      .doc(usuario.sucursal.idSucursal.toString())
      .collection('materiales')
      .doc(material.idMaterial.toString())
      .set(material);
  }

  public setMaterialDetalle(usuario: Usuario, material: MaterialDetalle) {
    return this.firestore
      .collection('empresas')
      .doc(usuario.sucursal.idEmpresa.toString())
      .collection('sucursales')
      .doc(usuario.sucursal.idSucursal.toString())
      .collection('materiales')
      .doc(material.idMaterial.toString())
      .collection('materialDetalle')
      .doc(material.idMaterialDetalle.toString())
      .set(material);
  }

  public getMateriales(usuario: Usuario) {
    return this.firestore
      .collection('empresas')
      .doc(usuario.sucursal.idEmpresa.toString())
      .collection('sucursales')
      .doc(usuario.sucursal.idSucursal.toString())
      .collection('materiales')
      .valueChanges();
  }
}
