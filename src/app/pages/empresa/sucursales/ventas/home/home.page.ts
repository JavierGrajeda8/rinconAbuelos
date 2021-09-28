import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Venta } from 'src/app/core/interfaces/Venta';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private ventas: Venta[] = [];
  constructor(private nav: NavController) {}

  ngOnInit() {
    this.ventas.push(
      {
        idVenta: null,
        idUsuario: null,
        idSucursal: null,
        fechaHora: Date.now(),
        cliente: 'Juan Jose',
        nit: 'CF',
        direccion: 'ciudad',
        total: 174.5,
        correo: '',
        serieFactura: 'B',
        numeroFactura: '1',
        fechaFactura: Date.now(),
        estado: 0,
      },
      {
        idVenta: null,
        idUsuario: null,
        idSucursal: null,
        fechaHora: Date.now(),
        cliente: 'Mauricio Gómez',
        nit: 'CF',
        direccion: 'ciudad',
        total: 55.48,
        correo: '',
        serieFactura: 'B',
        numeroFactura: '2',
        fechaFactura: Date.now(),
        estado: 0,
      }
    );
  }

  gestionarVenta() {
    this.nav.navigateForward('empresas/sucursal/ventas/crear');
  }
}
