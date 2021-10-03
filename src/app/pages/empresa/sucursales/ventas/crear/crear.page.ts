import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ConstStatus } from 'src/app/core/constants/constStatus';
import { ConstStrings } from 'src/app/core/constants/constStrings';
import { Categoria } from 'src/app/core/interfaces/Categoria';
import { Producto } from 'src/app/core/interfaces/Producto';
import { Usuario } from 'src/app/core/interfaces/Usuario';
import { Venta } from 'src/app/core/interfaces/Venta';
import { MaterialService } from 'src/app/core/services/materiales/material.service';
import { ProductoService } from 'src/app/core/services/productos/producto.service';
import { VentaService } from 'src/app/core/services/ventas/venta.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

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
    numeroFactura: '',
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
    idCategoria: 0,
    cantidad: '',
    precioVenta: null,
    costo: null,
    descuento: 0,
    fechaHora: Date.now(),
    estado: 0,
    fechaCaducidad: null,
    producto: { nombre: 'Hamburguesa', caduca: true },
  };

  public productos: Producto[] = [];
  public categorias: Categoria[] = [];
  public subscriptionP: Subscription;
  public subscriptionC: Subscription;
  private usuario: Usuario;
  private venta: Venta;
  constructor(
    private nav: NavController,
    private alertController: AlertController,
    private productoService: ProductoService,
    private ventaService: VentaService,
    private storage: StorageService,
    private toastController: ToastController,
    private materialService: MaterialService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.storage.get(ConstStrings.str.storage.user).then((usuario: string) => {
      this.usuario = JSON.parse(usuario) as Usuario;
      this.storage.get(ConstStrings.str.storage.venta).then((venta: string) => {
        this.venta = JSON.parse(venta) as Venta;
        console.log('venta', this.venta);
        if (this.venta) {
          this.data.idVenta = this.venta.idVenta;
          this.data.idUsuario = this.venta.idUsuario;
          this.data.idSucursal = this.venta.idSucursal;
          this.data.serieFactura = this.venta.serieFactura;
          this.data.numeroFactura = this.venta.numeroFactura;
          this.data.fechaFactura = new Date(
            this.venta.fechaFactura
          ).toDateString();
          this.data.fechaHora = this.venta.fechaHora;
          this.data.estado = this.venta.estado;
          this.data.correo = this.venta.correo;
          this.data.celular = this.venta.celular;
          this.data.cliente = this.venta.cliente;
          this.data.nit = this.venta.cliente;
          this.data.direccion = this.venta.direccion;
          this.data.descripcion = this.venta.descripcion;
          this.data.detalle = this.venta.ventaDetalle;
          // this.data.cantidadTotal = this.venta.cantidadTotal;
          // this.data.precioTotal = this.venta.precioTotal;
          this.calcularTotal();
          console.log('venta', this.data);
        }
      });
      this.getCategorias();
    });
  }

  ionViewWillLeave() {
    if (this.subscriptionP) {
      this.subscriptionP.unsubscribe();
    }
    if (this.subscriptionC) {
      this.subscriptionC.unsubscribe();
    }
  }

  mostrarForm() {
    this.data.agregandoDetalle = !this.data.agregandoDetalle;
    if (!this.data.agregandoDetalle) {
      this.dataDetalle.idCategoria = null;
      this.dataDetalle.idProducto = null;
      this.dataDetalle.cantidad = null;
      this.dataDetalle.precioVenta = null;
      this.dataDetalle.descuento = 0;
    }
  }

  elegirProducto() {
    const producto = this.productos.filter(
      // eslint-disable-next-line eqeqeq
      (ma) => ma.idProducto == this.dataDetalle.idProducto
    );
    this.dataDetalle.precioVenta = producto[0].precioVenta;
  }

  getCategorias() {
    this.subscriptionC = this.productoService
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
  getProductos() {
    const categoria: Categoria = {
      idCategoria: this.dataDetalle.idCategoria,
      nombre: '',
      estado: null,
    };
    this.subscriptionP = this.productoService
      .getProductos(this.usuario, categoria)
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
                this.data.detalle.find(
                  (r) => r.idVentaDetalle === detalle.idVentaDetalle
                )
              ),
              1
            );
            this.calcularTotal();

            console.log('Confirm Okay', detalle.idVentaDetalle);
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
      idCategoria: this.dataDetalle.idCategoria,
      cantidad: this.dataDetalle.cantidad,
      precioVenta: this.dataDetalle.precioVenta,
      costo: producto[0].costo,
      descuento: this.dataDetalle.descuento,
      fechaHora: Date.now(),
      estado: ConstStatus.activo,
      producto: producto[0],
    });

    this.dataDetalle.idCategoria = null;
    this.dataDetalle.idProducto = null;
    this.dataDetalle.cantidad = null;
    this.dataDetalle.precioVenta = null;
    this.dataDetalle.descuento = 0;
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

  async guardar() {
    const fecha = new Date(this.data.fechaFactura);

    let idVenta = Date.now();
    if (this.venta) {
      idVenta = this.venta.idVenta;
    }

    const venta: Venta = {
      idVenta,
      idUsuario: this.usuario.idUsuario,
      idSucursal: this.usuario.idSucursal,
      fechaHora: Date.now(),
      cliente: this.data.cliente,
      nit: this.data.nit.length === 0 ? 'CF' : this.data.nit,
      direccion:
        this.data.direccion.length === 0 ? 'CIUDAD' : this.data.direccion,
      total: this.data.total,
      correo: this.data.correo,
      celular: this.data.celular,
      serieFactura: this.data.serieFactura,
      numeroFactura: this.data.numeroFactura,
      fechaFactura: fecha.setSeconds(0, 0),
      descripcion: this.data.descripcion,
      estado: ConstStatus.activo,
      usuario: this.usuario,
      sucursal: this.usuario.sucursal,
      ventaDetalle: [],
    };

    this.data.detalle.forEach((detalle) => {
      venta.ventaDetalle.push({
        idVentaDetalle: detalle.idVentaDetalle,
        idVenta: venta.idVenta,
        idProducto: detalle.idProducto,
        cantidad: detalle.cantidad,
        precioVenta: detalle.precioVenta,
        costo: detalle.costo,
        descuento: detalle.descuento,
        fechaHora: Date.now(),
        estado: ConstStatus.activo,
        producto: detalle.producto,
      });
    });

    console.log('Información a grabar', venta);
    await this.ventaService.setVenta(this.usuario, venta);
    venta.ventaDetalle.forEach((v) => {
      v.producto.detalle.forEach((p) => {
        console.log('producto', p);
        this.materialService.updateMaterial(
          this.usuario,
          p.idMaterial,
          p.cantidad * v.cantidad
        );
      });
    });

    const toast = await this.toastController.create({
      header: 'Venta almacenada',
      message:
        'La compra de ' +
        venta.cliente +
        ' por ' +
        venta.total +
        ' ha sido guardada correctamente',
      duration: 5000,
      color: 'success',
      position: 'bottom',
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await this.nav.pop();
    toast.present();
  }
}
