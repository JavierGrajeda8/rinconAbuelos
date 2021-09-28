import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Producto } from 'src/app/core/interfaces/Producto';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  public data = {
    idVenta: null,
    idUsuario: null,
    idSucursal: null,
    serieFactura: '',
    numberoFactura: '',
    fechaFactura: '',
    cliente: '',
    nit: '',
    direccion: '',
    descripcion: '',
    fechaHora: null,
    estado: null,
    correo: '',
    celular: null,
    cantidadTotal: null,
    total: null,
    detalle: [],
    agregandoDetalle: false,
  };

  public dataDetalle = {
    idVentaDetalle: 1,
    idVenta: 1,
    idProducto: 2,
    cantidad: '',
    precioVenta: 15.45,
    costo: 15.45,
    descuento: 15.45,
    fechaHora: Date.now(),
    estado: 0,
    fechaCaducidad: null,
    producto: { nombre: 'Hamburguesa', caduca: true },
  };

  public productos: Producto[] = [];
  constructor(
    private nav: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.productos.push(
      {
        idProducto: 1,
        idCategoria: null,
        nombre: 'Hamburguesa con queso',
        descripcion: 'HambQueso',
        costo: 15.0,
        precioVenta: 16.5,
        estado: 1,
      },
      {
        idProducto: 2,
        idCategoria: null,
        nombre: 'Milkshake',
        descripcion: 'Licuado de fresa con leche',
        costo: 15.0,
        precioVenta: 16.5,
        estado: 1,
      }
    );

    this.data.detalle.push({
      idVentaDetalle: 1,
      idVenta: 1,
      idProducto: 1,
      cantidad: 1,
      precioVenta: 16.5,
      costo: 15.0,
      descuento: 0,
      fechaHora: Date.now(),
      estado: 1,
      producto: { nombre: 'Milkshake' },
    });
    this.data.detalle.push({
      idVentaDetalle: 1,
      idVenta: 1,
      idProducto: 1,
      cantidad: 1,
      precioVenta: 16.5,
      costo: 15.0,
      descuento: 0,
      fechaHora: Date.now(),
      estado: 1,
      producto: { nombre: 'Hamburguesa con queso' },
    });

    this.calcularTotal();
  }

  mostrarForm() {
    this.data.agregandoDetalle = !this.data.agregandoDetalle;
  }

  elegirMaterial() {
    const material = this.productos.filter(
      // eslint-disable-next-line eqeqeq
      (ma) => ma.idProducto == this.dataDetalle.idProducto
    );
  }

  async eliminarDetalle(detalle) {
    const alert = await this.alertController.create({
      header: 'Eliminar detalle',
      message:
        '¿Estás seguro que deseas eliminar <strong>' +
        detalle.cantidad +
        ' ' +
        detalle.producto.nombre +
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
              )
            );
            this.calcularTotal();

            console.log('Confirm Okay', detalle.id);
          },
        },
      ],
    });
    alert.present();
  }

  agregarDetalle() {
    const producto = this.productos.filter(
      // eslint-disable-next-line eqeqeq
      (ma) => ma.idProducto == this.dataDetalle.idProducto
    );
    this.data.detalle.push({
      idVentaDetalle: Date.now(),
      idVenta: this.data.idVenta,
      idProducto: this.dataDetalle.idProducto,
      cantidad: this.dataDetalle.cantidad,
      precioVenta: this.dataDetalle.precioVenta,
      costo: producto[0].costo,
      descuento: this.dataDetalle.descuento,
      fechaHora: Date.now(),
      estado: 1,
      producto: { nombre: producto[0].nombre },
    });
    this.calcularTotal();
    this.data.agregandoDetalle = !this.data.agregandoDetalle;
  }

  calcularTotal() {
    this.data.cantidadTotal = 0;
    this.data.total = 0;
    this.data.detalle.forEach((detalle) => {
      this.data.cantidadTotal += detalle.cantidad;
      this.data.total += detalle.cantidad * detalle.precioVenta;
    });
  }

  cancelar() {
    this.nav.pop();
  }
}
