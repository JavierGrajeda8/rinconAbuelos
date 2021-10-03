import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ConstStatus } from 'src/app/core/constants/constStatus';
import { ConstStrings } from 'src/app/core/constants/constStrings';
import { Categoria } from 'src/app/core/interfaces/Categoria';
import { Producto } from 'src/app/core/interfaces/Producto';
import { Usuario } from 'src/app/core/interfaces/Usuario';
import { ProductoService } from 'src/app/core/services/productos/producto.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  usuario: Usuario;
  categoria: Categoria;
  subscription: Subscription;
  private productos: Producto[] = [];
  constructor(
    private nav: NavController,
    private storage: StorageService,
    private productoService: ProductoService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.storage.get(ConstStrings.str.storage.user).then((usuario: string) => {
      this.usuario = JSON.parse(usuario) as Usuario;
      this.storage
        .get(ConstStrings.str.storage.categoria)
        .then((categoria: string) => {
          this.categoria = JSON.parse(categoria) as Categoria;
          this.getProductos();
        });
    });
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getProductos() {
    this.subscription = this.productoService
      .getProductos(this.usuario, this.categoria)
      .subscribe((productos) => {
        console.log('productos', productos);
        this.productos = [];
        productos.forEach((producto) => {
          if (producto.estado !== ConstStatus.eliminado) {
            this.productos.push(producto as Producto);
          }
        });
      });
  }

  async crear(producto) {
    console.log('producto', producto);
    await this.storage.set(
      ConstStrings.str.storage.producto,
      JSON.stringify(producto)
    );
    this.nav.navigateForward('empresas/sucursal/categorias/productos/crear');
  }

  async borrar(producto: Producto) {
    const alert = await this.alertController.create({
      header: 'Eliminar categoría',
      message:
        '¿Estás seguro que deseas eliminar el producto <strong>' +
        producto.nombre +
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
            this.productoService
              .deleteProducto(this.usuario, producto)
              .then(() => {
                this.getProductos();
              });
            console.log('Confirm Okay', producto.idProducto);
          },
        },
      ],
    });
    alert.present();
  }
}
