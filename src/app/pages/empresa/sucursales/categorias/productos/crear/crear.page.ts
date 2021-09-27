import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Categoria } from 'src/app/core/interfaces/Categoria';
import { Material } from 'src/app/core/interfaces/Material';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  public data = {
    idProducto: null,
    idCategoria: null,
    nombre: '',
    descripcion: '',
    costo: null,
    precioVenta: null,
    estado: null,
    categoria: null,
    detalle: [],
    agregandoDetalle: false,
  };

  public categorias: Categoria[] = [];
  public materiales: Material[] = [];
  constructor(
    private alertController: AlertController,
    private nav: NavController
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
    this.materiales.push(
      {
        idMaterial: 1,
        nombre: 'Harina',
        unidadMedida: 'oz',
        descripcion: 'Harina para pan',
        cantidad: 150,
        caduca: true,
        costoPromedio: 10.5,
        estado: 1,
      },
      {
        idMaterial: 2,
        nombre: 'Carne de hamburguesa',
        unidadMedida: 'unidad',
        descripcion: 'Torta de carne para hamburguesa',
        cantidad: 10,
        caduca: true,
        costoPromedio: 12.5,
        estado: 1,
      }
    );
    this.data.detalle.push({
      idProdutoDetalle: Date.now(),
      idProducto: 1,
      idMaterial: 1,
      costoPromedio: 10.5,
      cantidad: 1,
      paraLlevar: true,
      afectaPrecio: false,
      estado: null,
      material: { nombre: 'Torta de hamburguesa' },
    });
    this.data.detalle.push({
      idProdutoDetalle: Date.now(),
      idProducto: 2,
      idMaterial: 1,
      costoPromedio: 15.6,
      cantidad: 3,
      paraLlevar: true,
      afectaPrecio: false,
      estado: null,
      material: { nombre: 'Pan' },
    });
    this.data.costo = 0;
    this.data.detalle.forEach((detalle) => {
      this.data.costo += detalle.costoPromedio;
    });
  }

  mostrarForm() {
    this.data.agregandoDetalle = !this.data.agregandoDetalle;
  }

  async eliminarDetalle(detalle) {
    const alert = await this.alertController.create({
      header: 'Eliminar detalle',
      message:
        '¿Estás seguro que deseas eliminar <strong>' +
        detalle.cantidad +
        ' ' +
        detalle.material.nombre +
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
            this.data.detalle.splice(
              this.data.detalle.indexOf(
                this.data.detalle.find((r) => r.id === detalle.id)
              ),
              1
            );
            console.log('Confirm Okay', detalle.id);
          },
        },
      ],
    });
    alert.present();
  }

  cancelar() {
    this.nav.pop();
  }
}
