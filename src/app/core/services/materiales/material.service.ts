import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Material } from '../../interfaces/Material';
import { MaterialDetalle } from '../../interfaces/MaterialDetalle';
import { Usuario } from '../../interfaces/Usuario';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  constructor(private firestore: AngularFirestore) {}

  public setMaterial(usuario: Usuario, material: Material) {
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
