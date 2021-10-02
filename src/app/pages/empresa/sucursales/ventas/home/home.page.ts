import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ConstStrings } from 'src/app/core/constants/constStrings';
import { Usuario } from 'src/app/core/interfaces/Usuario';
import { Venta } from 'src/app/core/interfaces/Venta';
import { VentaService } from 'src/app/core/services/ventas/venta.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public usuario: Usuario;
  private subscription: Subscription;
  private ventas: Venta[] = [];
  constructor(
    private nav: NavController,
    private storage: StorageService,
    private ventaService: VentaService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.storage.get(ConstStrings.str.storage.user).then((usuario: string) => {
      this.usuario = JSON.parse(usuario) as Usuario;
      this.getVentas();
    });
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getVentas() {
    this.subscription = this.ventaService
      .getVentas(this.usuario)
      .subscribe((ventas) => {
        this.ventas = [];

        console.log(ventas);
        ventas.forEach((ven) => {
          this.ventas.push(ven as Venta);
        });
        this.ventas = this.ventas.sort((a, b) =>
          b.fechaFactura < a.fechaFactura ? 1 : -1
        );
      });
  }

  private async gestionarVenta(venta: Venta) {
    console.log('venta', venta);
    await this.storage.set(
      ConstStrings.str.storage.venta,
      JSON.stringify(venta)
    );
    this.nav.navigateForward('empresas/sucursal/ventas/crear');
  }
}
