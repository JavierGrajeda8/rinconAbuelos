import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ConstStrings } from 'src/app/core/constants/constStrings';
import { Usuario } from 'src/app/core/interfaces/Usuario';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public usuario: Usuario;
  constructor(private nav: NavController, private storage: StorageService) {}

  ngOnInit() {
    this.storage.get(ConstStrings.str.storage.user).then((usuario: string) => {
      this.usuario = JSON.parse(usuario) as Usuario;
    });
  }

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
