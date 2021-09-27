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
        serie: 'B',
        numeroFactura: '1',
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
        serie: 'B',
        numeroFactura: '2',
        estado: 0,
      }
    );
  }
}
