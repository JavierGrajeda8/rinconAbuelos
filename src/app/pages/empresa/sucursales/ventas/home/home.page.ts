import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ConstStatus } from 'src/app/core/constants/constStatus';
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
    private ventaService: VentaService,
    private alertController: AlertController
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
          if (ven.estado !== ConstStatus.eliminado) {
            this.ventas.push(ven as Venta);
          }
        });
        this.ventas = this.ventas.sort((a, b) =>
          b.fechaFactura < a.fechaFactura ? 1 : -1
        );
      });
  }

  async borrar(venta: Venta) {
    const alert = await this.alertController.create({
      header: 'Eliminar categoría',
      message:
        '¿Estás seguro que deseas eliminar la venta del cliente <strong>' +
        venta.cliente +
        '</strong>?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.ventaService.deleteVenta(this.usuario, venta).then(() => {
              this.getVentas();
            });
            console.log('Confirm Okay', venta.idVenta);
          },
        },
      ],
    });
    alert.present();
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
