import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Material } from 'src/app/core/interfaces/Material';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  public data = {
    idGasto: null,
    idUsuario: null,
    idSucursal: null,
    serieFactura: '',
    numberoFactura: '',
    fechaFactura: '',
    proveedor: '',
    fechaHora: null,
    estado: null,
    categoria: null,
    detalle: [],
    agregandoDetalle: false,
  };

  public dataDetalle = {
    idGasto: 1,
    idMaterial: 2,
    descripcion: '',
    cantidad: 10,
    precioUnitario: 15.45,
    fechaHora: Date.now(),
    estado: 0,
    caduca: null,
    fechaCaducidad: null,
    material: { nombre: 'Harina', caduca: true },
  };
  public materiales: Material[] = [];

  constructor(
    private nav: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
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
        caduca: false,
        costoPromedio: 12.5,
        estado: 1,
      }
    );

    this.data.detalle.push(
      {
        idGasto: 1,
        idMaterial: 2,
        descripcion: '',
        cantidad: 10,
        precioUnitario: 15.45,
        fechaHora: Date.now(),
        estado: 0,
        material: { nombre: 'Harina', caduca: true },
      },
      {
        idGasto: 1,
        idMaterial: 2,
        descripcion: '',
        cantidad: 15,
        precioUnitario: 5.1,
        fechaHora: Date.now(),
        estado: 0,
        material: { nombre: 'Manzana', caduca: false },
      }
    );
  }

  mostrarForm() {
    this.data.agregandoDetalle = !this.data.agregandoDetalle;
  }

  elegirMaterial() {
    const material = this.materiales.filter(
      // eslint-disable-next-line eqeqeq
      (ma) => ma.idMaterial == this.dataDetalle.idMaterial
    );
    if (material){
      if (material.length === 1){
        this.dataDetalle.caduca =  material[0].caduca ? material[0].caduca: false;
      }
    }
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

  agregarDetalle() {
    const material = this.materiales.filter(
      // eslint-disable-next-line eqeqeq
      (ma) => ma.idMaterial == this.dataDetalle.idMaterial
    );
    if (material){
      if (material.length === 1){
        this.dataDetalle.caduca =  material[0].caduca ? material[0].caduca: false;
      }
    }
    this.data.detalle.push({
      idGasto: 1,
      idMaterial: 2,
      descripcion: '',
      cantidad: 10,
      precioUnitario: 15.45,
      fechaHora: Date.now(),
      estado: 0,
      material: { nombre: material[0].nombre, caduca: material[0].caduca   },
    });
    this.data.agregandoDetalle = !this.data.agregandoDetalle;
  }

  cancelar() {
    this.nav.pop();
  }
}
