import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Categoria } from 'src/app/core/interfaces/Categoria';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public categorias: Categoria[] = [];
  data = {nombre: ''};
  constructor(
    private nav: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.categorias.push(
      {
        idCategoria: 1,
        nombre: 'Platos fuertes',
        estado: 1,
      },
      {
        idCategoria: 1,
        nombre: 'Bebidas',
        estado: 1,
      },
      {
        idCategoria: 1,
        nombre: 'Postres',
        estado: 1,
      }
    );
  }

  async agregarCategoria() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Agregar categoría',
      message: 'Por favor ingresa el nombre de la categoría:',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
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
          },
        },
      ],
    });

    await alert.present();
  }

  irProducto() {
    this.nav.navigateForward('empresas/sucursal/categorias/productos');
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
            console.log('Confirm Okay', categoria.idCategoria);
          },
        },
      ],
    });

    await alert.present();
  }
}
