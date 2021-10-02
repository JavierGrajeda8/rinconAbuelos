import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ConstStatus } from 'src/app/core/constants/constStatus';
import { ConstStrings } from 'src/app/core/constants/constStrings';
import { Gasto } from 'src/app/core/interfaces/Gasto';
import { Material } from 'src/app/core/interfaces/Material';
import { MaterialDetalle } from 'src/app/core/interfaces/MaterialDetalle';
import { Usuario } from 'src/app/core/interfaces/Usuario';
import { GastoService } from 'src/app/core/services/gastos/gasto.service';
import { MaterialService } from 'src/app/core/services/materiales/material.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

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
    numeroFactura: '',
    fechaFactura: '',
    proveedor: '',
    fechaHora: null,
    estado: null,
    cantidadTotal: null,
    precioTotal: null,
    categoria: null,
    detalle: [],
    agregandoDetalle: false,
  };

  public dataDetalle = {
    idGasto: null,
    idMaterial: null,
    descripcion: '',
    cantidad: null,
    precioUnitario: null,
    fechaHora: Date.now(),
    estado: 0,
    caduca: null,
    fechaCaducidad: null,
    material: { nombre: 'Harina', caduca: true },
  };
  public materiales: Material[] = [];
  public usuario: Usuario;
  public gasto: Gasto;
  public material: Material;
  public subscription: Subscription;
  public subscriptionM: Subscription;
  constructor(
    private nav: NavController,
    private alertController: AlertController,
    private storage: StorageService,
    private materialService: MaterialService,
    private gastoService: GastoService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.calcularTotal();
  }

  ionViewWillEnter() {
    this.storage.get(ConstStrings.str.storage.user).then((usuario: string) => {
      this.usuario = JSON.parse(usuario) as Usuario;
      this.storage.get(ConstStrings.str.storage.gasto).then((gasto: string) => {
        this.gasto = JSON.parse(gasto) as Gasto;
        console.log('gasto', this.gasto);
        if (this.gasto) {
          this.data.idGasto = this.gasto.idGasto;
          this.data.idUsuario = this.gasto.idUsuario;
          this.data.idSucursal = this.gasto.idSucursal;
          this.data.serieFactura = this.gasto.serieFactura;
          this.data.numeroFactura = this.gasto.numeroFactura;
          this.data.fechaFactura = new Date(
            this.gasto.fechaFactura
          ).toDateString();
          this.data.proveedor = this.gasto.proveedor;
          this.data.fechaHora = this.gasto.fechaHora;
          this.data.estado = this.gasto.estado;
          // this.data.cantidadTotal = this.gasto.cantidadTotal;
          // this.data.precioTotal = this.gasto.precioTotal;
          this.data.detalle = this.gasto.detalle;
          this.calcularTotal();
        }
      });
      this.getMateriales();
    });
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionM) {
      this.subscription.unsubscribe();
    }
  }

  getMateriales() {
    this.subscriptionM = this.materialService
      .getMateriales(this.usuario)
      .subscribe((materiales) => {
        this.materiales = [];

        console.log(materiales);
        materiales.forEach((mat) => {
          this.materiales.push(mat as Material);
        });
        this.materiales = this.materiales.sort((a, b) =>
          b.nombre < a.nombre ? 1 : -1
        );
      });
  }

  mostrarForm() {
    this.data.agregandoDetalle = !this.data.agregandoDetalle;
  }

  elegirMaterial() {
    const material = this.materiales.filter(
      // eslint-disable-next-line eqeqeq
      (ma) => ma.idMaterial == this.dataDetalle.idMaterial
    );
    if (material) {
      if (material.length === 1) {
        this.material = material[0];
        this.dataDetalle.caduca = material[0].caduca
          ? material[0].caduca
          : false;
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
    const material = this.materiales.filter(
      // eslint-disable-next-line eqeqeq
      (ma) => ma.idMaterial == this.dataDetalle.idMaterial
    );
    console.log(this.dataDetalle.fechaCaducidad);
    const fechaC = new Date(this.dataDetalle.fechaCaducidad);

    this.data.detalle.push({
      idGasto: 1,
      idMaterial: this.dataDetalle.idMaterial,
      descripcion: '',
      cantidad: this.dataDetalle.cantidad,
      precioUnitario: this.dataDetalle.precioUnitario,
      fechaHora: Date.now(),
      estado: 0,
      fechaCaducidad: fechaC.setSeconds(0, 0),
      material: {
        nombre: material[0].nombre,
        caduca: material[0].caduca,
        fechaCaducidad: fechaC.setSeconds(0, 0),
      },
    });
    this.dataDetalle.idMaterial = null;
    this.dataDetalle.cantidad = null;
    this.dataDetalle.fechaCaducidad = null;
    this.dataDetalle.precioUnitario = null;
    this.calcularTotal();
    this.data.agregandoDetalle = !this.data.agregandoDetalle;
  }

  calcularTotal() {
    this.data.cantidadTotal = 0;
    this.data.precioTotal = 0;
    this.data.detalle.forEach((detalle) => {
      this.data.cantidadTotal += detalle.cantidad;
      this.data.precioTotal += detalle.cantidad * detalle.precioUnitario;
    });
  }

  cancelar() {
    this.nav.pop();
  }

  async guardar() {
    const fecha = new Date(this.data.fechaFactura);

    let idGasto = Date.now();
    if (this.gasto) {
      idGasto = this.gasto.idGasto;
    }
    const gasto: Gasto = {
      idGasto,
      idUsuario: this.usuario.idUsuario,
      idSucursal: this.usuario.idSucursal,
      serieFactura: this.data.serieFactura,
      numeroFactura: this.data.numeroFactura,
      fechaFactura: fecha.setSeconds(0, 0),
      proveedor: this.data.proveedor,
      fechaHora: Date.now(),
      estado: ConstStatus.activo,
      usuario: this.usuario,
      detalle: [],
    };
    const materialDetalle: MaterialDetalle[] = [];
    const materialAux: Material[] = [];

    this.data.detalle.forEach((detalle) => {
      gasto.detalle.push({
        idGastoDetalle: Date.now(),
        idGasto: gasto.idGasto,
        idMaterial: detalle.idMaterial,
        descripcion: '',
        cantidad: detalle.cantidad,
        precioUnitario: detalle.precioUnitario,
        fechaHora: detalle.fechaHora,
        estado: ConstStatus.activo,
        material: detalle.material,
      });

      materialDetalle.push({
        idMaterialDetalle: Date.now(),
        idMaterial: detalle.idMaterial,
        lote: Date.now(),
        cantidad: detalle.cantidad,
        fecha: Date.now(),
        fechaExpiracion: detalle.material.fechaCaducidad,
        estado: ConstStatus.activo,
        material: detalle.material,
      });

      const material = this.materiales.filter(
        // eslint-disable-next-line eqeqeq
        (ma) => ma.idMaterial == detalle.idMaterial
      );

      material[0].cantidad += detalle.cantidad;
      material[0].costoPromedio =
        (material[0].costoPromedio +
          detalle.precioUnitario * detalle.cantidad) /
        material[0].cantidad;
      materialAux.push(material[0]);
    });

    console.log('Información a grabar gasto', gasto);
    console.log('Información a grabar material', this.material);
    console.log('Información a grabar detalle material', materialDetalle);
    await this.gastoService.setGasto(this.usuario, gasto);
    materialAux.forEach(async (mat) => {
      await this.materialService.setMaterial(this.usuario, mat);
    });
    materialDetalle.forEach(async (mat) => {
      await this.materialService.setMaterialDetalle(this.usuario, mat);
    });
    const toast = await this.toastController.create({
      header: 'Gasto almacenado',
      message: 'El gasto de' + gasto.proveedor,
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
