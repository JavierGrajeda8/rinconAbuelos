import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ConstStatus } from '../../constants/constStatus';
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

  public deleteGasto(usuario: Usuario, gasto: Gasto) {
    gasto.estado = ConstStatus.eliminado;
    return this.firestore
      .collection('empresas')
      .doc(usuario.sucursal.idEmpresa.toString())
      .collection('sucursales')
      .doc(usuario.sucursal.idSucursal.toString())
      .collection('gastos')
      .doc(gasto.idGasto.toString())
      .set(gasto);
  }

  public setGasto(usuario: Usuario, gasto: Gasto) {
    this.firestore
      .collection('gastos')
      .doc(gasto.idGasto.toString())
      .set(gasto);

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
