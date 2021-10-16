import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ConstStatus } from '../../constants/constStatus';
import { Usuario } from '../../interfaces/Usuario';
import { Venta } from '../../interfaces/Venta';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  constructor(private firestore: AngularFirestore) {}

  public getVentas(usuario: Usuario) {
    return this.firestore
      .collection('empresas')
      .doc(usuario.sucursal.idEmpresa.toString())
      .collection('sucursales')
      .doc(usuario.sucursal.idSucursal.toString())
      .collection('ventas')
      .valueChanges();
  }

  public setVenta(usuario: Usuario, venta: Venta) {
    this.firestore
      .collection('ventas')
      .doc(venta.idVenta.toString())
      .set(venta);

    return this.firestore
      .collection('empresas')
      .doc(usuario.sucursal.idEmpresa.toString())
      .collection('sucursales')
      .doc(usuario.sucursal.idSucursal.toString())
      .collection('ventas')
      .doc(venta.idVenta.toString())
      .set(venta);
  }

  public deleteVenta(usuario: Usuario, venta: Venta) {
    venta.estado = ConstStatus.eliminado;
    return this.firestore
      .collection('empresas')
      .doc(usuario.sucursal.idEmpresa.toString())
      .collection('sucursales')
      .doc(usuario.sucursal.idSucursal.toString())
      .collection('ventas')
      .doc(venta.idVenta.toString())
      .set(venta);
  }
}
