import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ConstStatus } from 'src/app/core/constants/constStatus';
import { ConstStrings } from 'src/app/core/constants/constStrings';
import { Categoria } from 'src/app/core/interfaces/Categoria';
import { Usuario } from 'src/app/core/interfaces/Usuario';
import { ProductoService } from 'src/app/core/services/productos/producto.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public categorias: Categoria[] = [];
  data = { nombre: '' };
  public usuario: Usuario;
  private subscription: Subscription;
  constructor(
    private nav: NavController,
    private alertController: AlertController,
    private productoService: ProductoService,
    private storage: StorageService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.storage.get(ConstStrings.str.storage.user).then((usuario: string) => {
      this.usuario = JSON.parse(usuario) as Usuario;
      this.getCategorias();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  getCategorias() {
    this.subscription = this.productoService
      .getCategorias(this.usuario)
      .subscribe((categorias) => {
        this.categorias = [];

        console.log(categorias);
        categorias.forEach((cat) => {
          if (cat.estado !== ConstStatus.eliminado) {
            this.categorias.push(cat as Categoria);
          }
        });
        this.categorias = this.categorias.sort((a, b) =>
          b.nombre < a.nombre ? 1 : -1
        );
      });
  }

  async agregarCategoria(categoriaAux: Categoria) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Agregar categoría',
      message: 'Por favor ingresa el nombre de la categoría:',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          value: categoriaAux ? categoriaAux.nombre : '',
          placeholder: 'Nombre (max. 50)',
          attributes: {
            maxlength: 50,
          },
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Agregar',
          handler: (data) => {
            console.log('Confirm Ok', data);
            this.data.nombre = data.nombre;
            let idCategoria = Date.now();
            if (categoriaAux) {
              idCategoria = categoriaAux.idCategoria;
            }
            const categoria: Categoria = {
              idCategoria,
              nombre: data.nombre,
              estado: ConstStatus.activo,
              idSucursal: this.usuario.sucursal.idSucursal,
            };

            this.productoService
              .setCategoria(this.usuario, categoria)
              .then(() => {});
          },
        },
      ],
    });

    await alert.present();
  }

  irProducto(categoria: Categoria) {
    this.storage
      .set(ConstStrings.str.storage.categoria, JSON.stringify(categoria))
      .then(() => {
        this.nav.navigateForward('empresas/sucursal/categorias/productos');
      });
  }
  async borrar(categoria: Categoria) {
    const alert = await this.alertController.create({
      header: 'Eliminar categoría',
      message:
        '¿Estás seguro que deseas eliminar la categoría <strong>' +
        categoria.nombre +
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
              .deleteCategoria(this.usuario, categoria)
              .then(() => {
                this.getCategorias();
              });
            console.log('Confirm Okay', categoria.idCategoria);
          },
        },
      ],
    });

    await alert.present();
  }
}
