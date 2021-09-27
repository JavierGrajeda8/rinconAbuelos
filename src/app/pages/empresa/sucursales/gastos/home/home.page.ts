import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Gasto } from 'src/app/core/interfaces/Gasto';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private gastos: Gasto[] = [];
  constructor(private nav: NavController) {}

  ngOnInit() {
    this.gastos.push({
      idGasto: 1,
      idSucursal: 0,
      idUsuario: 0,
      serieFactura: 'A',
      numeroFactura: '12346',
      fechaHora: Date.now(),
      estado: 0,
    },
    {
      idGasto: 2,
      idSucursal: 0,
      idUsuario: 0,
      serieFactura: 'B',
      numeroFactura: '789456',
      fechaHora: Date.now(),
      estado: 0,
    });
  }
}
