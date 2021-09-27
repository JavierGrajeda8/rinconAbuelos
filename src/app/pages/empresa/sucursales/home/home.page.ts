import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private nav: NavController) {}

  ngOnInit() {}

  productos() {
    this.nav.navigateForward('empresas/sucursal/categorias');
  }
  ventas() {
    this.nav.navigateForward('empresas/sucursal/ventas');
  }
  materiales() {
    this.nav.navigateForward('empresas/sucursal/materiales');
  }
  gastos() {
    this.nav.navigateForward('empresas/sucursal/gastos');
  }
}
