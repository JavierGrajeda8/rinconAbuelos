import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Material } from 'src/app/core/interfaces/Material';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public materiales: Material[] = [];
  public material: Material;
  data = {
    nombre: '',
    descripcion: '',
    cantidad: null,
    costo: null,
    idEstado: 0,
    caduca: null
  };
  constructor(
    private nav: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.materiales.push(
      {
        idMaterial: 0,
        nombre: 'Harina',
        unidadMedida: 'oz',
        descripcion: 'Harina para pan',
        cantidad: 150,
        caduca: true,
        costoPromedio: 10.5,
        estado: 1,
      },
      {
        idMaterial: 0,
        nombre: 'Carne de hamburguesa',
        unidadMedida: 'unidad',
        descripcion: 'Torta de carne para hamburguesa',
        cantidad: 10,
        caduca: true,
        costoPromedio: 12.5,
        estado: 1,
      }
    );
  }

  async gestionarMaterial(material: Material) {
    this.nav.navigateForward('empresas/sucursal/materiales/crear');

    // this.material = material;
    // const alert = await this.alertController.create({
    //   cssClass: 'my-custom-class',
    //   header: material ? 'Editar material' : 'Agregar material',
    //   message: 'Por favor ingresa la información de tu material:',
    //   inputs: [
    //     {
    //       name: 'nombre',
    //       type: 'text',
    //       placeholder: 'Nombre (max. 100)',
    //       attributes: {
    //         maxlength: 100,
    //         value: material ? material.nombre : '',
    //       },
    //     },
    //     {
    //       name: 'descripcion',
    //       type: 'textarea',
    //       placeholder: 'Descripción (max. 200)',
    //       attributes: {
    //         maxlength: 200,
    //         value: material ? material.descripcion : '',
    //       },
    //     },
    //     {
    //       name: 'cantidad',
    //       type: 'number',
    //       placeholder: 'Inventario inicial',
    //       attributes: {
    //         value: material ? material.cantidad : '',
    //       },
    //     },
    //     {
    //       name: 'costo',
    //       type: 'number',
    //       placeholder: 'Costo',
    //       attributes: {
    //         value: material ? material.costoPromedio : '',
    //       },
    //     },
    //   ],
    //   buttons: [
    //     {
    //       text: 'Cancelar',
    //       role: 'cancel',
    //       cssClass: 'secondary',
    //       handler: () => {
    //         console.log('Confirm Cancel');
    //       },
    //     },
    //     {
    //       text: 'Agregar',
    //       handler: (data) => {
    //         console.log('Confirm Ok', data);
    //         this.data.nombre = data.nombre;
    //         this.data.descripcion = data.descripcion;
    //         this.data.cantidad = data.cantidad;
    //         this.data.costo = data.costo;
    //         this.data.caduca = data.caduca;
    //       },
    //     },
    //   ],
    // });

    // await alert.present();
  }

  detalle(material: Material) {
    this.nav.navigateForward('empresas/sucursal/materiales/detalle');
  }
}
