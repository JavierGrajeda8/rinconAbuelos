import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ConstStrings } from 'src/app/core/constants/constStrings';
import { Gasto } from 'src/app/core/interfaces/Gasto';
import { Usuario } from 'src/app/core/interfaces/Usuario';
import { GastoService } from 'src/app/core/services/gastos/gasto.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public usuario: Usuario;
  private subscription: Subscription;
  private gastos: Gasto[] = [];
  constructor(
    private nav: NavController,
    private storage: StorageService,
    private gastoService: GastoService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.storage.get(ConstStrings.str.storage.user).then((usuario: string) => {
      this.usuario = JSON.parse(usuario) as Usuario;
      this.getGastos();
    });
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getGastos() {
    this.subscription = this.gastoService
      .getGastos(this.usuario)
      .subscribe((gastos) => {
        this.gastos = [];

        console.log(gastos);
        gastos.forEach((gas) => {
          this.gastos.push(gas as Gasto);
        });
        this.gastos = this.gastos.sort((a, b) =>
          b.fechaFactura < a.fechaFactura ? 1 : -1
        );
      });
  }

  private async gestionarGasto(gasto: Gasto) {
    console.log('gasto', gasto);
    await this.storage.set(
      ConstStrings.str.storage.gasto,
      JSON.stringify(gasto)
    );
    this.nav.navigateForward('empresas/sucursal/gastos/crear');
  }
}
