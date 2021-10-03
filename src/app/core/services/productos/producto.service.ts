import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ConstStatus } from '../../constants/constStatus';
import { Categoria } from '../../interfaces/Categoria';
import { Producto } from '../../interfaces/Producto';
import { Usuario } from '../../interfaces/Usuario';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private firestore: AngularFirestore) {}

  public setCategoria(usuario: Usuario, categoria: Categoria) {
    return this.firestore
      .collection('empresas')
      .doc(usuario.sucursal.idEmpresa.toString())
      .collection('sucursales')
      .doc(usuario.sucursal.idSucursal.toString())
      .collection('categorias')
      .doc(categoria.idCategoria.toString())
      .set(categoria);
  }

  public deleteCategoria(usuario: Usuario, categoria: Categoria) {
    categoria.estado = ConstStatus.eliminado;
    return this.firestore
      .collection('empresas')
      .doc(usuario.sucursal.idEmpresa.toString())
      .collection('sucursales')
      .doc(usuario.sucursal.idSucursal.toString())
      .collection('categorias')
      .doc(categoria.idCategoria.toString())
      .set(categoria);
  }

  public getCategorias(usuario: Usuario) {
    return this.firestore
      .collection('empresas')
      .doc(usuario.sucursal.idEmpresa.toString())
      .collection('sucursales')
      .doc(usuario.sucursal.idSucursal.toString())
      .collection('categorias')
      .valueChanges();
  }

  public setProducto(usuario: Usuario, producto: Producto) {
    return this.firestore
      .collection('empresas')
      .doc(usuario.sucursal.idEmpresa.toString())
      .collection('sucursales')
      .doc(usuario.sucursal.idSucursal.toString())
      .collection('categorias')
      .doc(producto.categoria.idCategoria.toString())
      .collection('productos')
      .doc(producto.idProducto.toString())
      .set(producto);
  }

  public deleteProducto(usuario: Usuario, producto: Producto) {
    producto.estado = ConstStatus.eliminado;
    return this.firestore
      .collection('empresas')
      .doc(usuario.sucursal.idEmpresa.toString())
      .collection('sucursales')
      .doc(usuario.sucursal.idSucursal.toString())
      .collection('categorias')
      .doc(producto.categoria.idCategoria.toString())
      .collection('productos')
      .doc(producto.idProducto.toString())
      .set(producto);
  }

  public getProductos(usuario: Usuario, categoria: Categoria) {
    return this.firestore
      .collection('empresas')
      .doc(usuario.sucursal.idEmpresa.toString())
      .collection('sucursales')
      .doc(usuario.sucursal.idSucursal.toString())
      .collection('categorias')
      .doc(categoria.idCategoria.toString())
      .collection('productos')
      .valueChanges();
  }
}
