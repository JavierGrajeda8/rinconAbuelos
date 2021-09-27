import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/core/interfaces/Producto';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private productos: Producto[] = [];
  constructor() {}

  ngOnInit() {
    this.productos.push(
      {
        idProducto: 1,
        idCategoria: 1,
        nombre: 'Hamburguesa de la casa',
        estado: 0,
        costo: 24.6,
        precioVenta: 26.0,
      },
      {
        idProducto: 1,
        idCategoria: 1,
        nombre: 'Hamburguesa con queso',
        estado: 0,
        costo: 25.6,
        precioVenta: 28.0,
      },
      {
        idProducto: 1,
        idCategoria: 1,
        nombre: 'Hamburguesa con tocino',
        estado: 0,
        costo: 28.35,
        precioVenta: 31.0,
      }
    );
  }
}
