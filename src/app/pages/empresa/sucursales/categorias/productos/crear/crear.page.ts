import {
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  AlertController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ConstStatus } from 'src/app/core/constants/constStatus';
import { ConstStrings } from 'src/app/core/constants/constStrings';
import { Categoria } from 'src/app/core/interfaces/Categoria';
import { Material } from 'src/app/core/interfaces/Material';
import { Producto } from 'src/app/core/interfaces/Producto';
import { Usuario } from 'src/app/core/interfaces/Usuario';
import { MaterialService } from 'src/app/core/services/materiales/material.service';
import { ProductoService } from 'src/app/core/services/productos/producto.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

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

  public dataDetalle = {
    idMaterial: null,
    cantidad: null,
    paraLlevar: null,
    afectaPrecio: true,
  };

  public categorias: Categoria[] = [];
  public materiales: Material[] = [];
  public material: Material;
  public usuario: Usuario;
  public categoria: Categoria;
  public producto: Producto;
  public subscriptionC: Subscription;
  public subscriptionM: Subscription;
  constructor(
    private alertController: AlertController,
    private nav: NavController,
    private materialService: MaterialService,
    private productoService: ProductoService,
    private storage: StorageService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    this.usuario = (await JSON.parse(
      await this.storage.get(ConstStrings.str.storage.user)
    )) as Usuario;
    this.categoria = (await JSON.parse(
      await this.storage.get(ConstStrings.str.storage.categoria)
    )) as Categoria;
    this.producto = (await JSON.parse(
      await this.storage.get(ConstStrings.str.storage.producto)
    )) as Producto;
    if (this.producto) {
      console.log('producto0', this.producto);
      this.cargarProducto();
    }

    this.getMateriales();
    this.getCategorias();
  }

  ionViewWillLeave() {
    if (this.subscriptionM) {
      this.subscriptionM.unsubscribe();
    }
    if (this.subscriptionC) {
      this.subscriptionC.unsubscribe();
    }
  }

  cargarProducto() {
    this.data.idProducto = this.producto.idProducto;
    this.data.idCategoria = this.producto.idCategoria;
    this.data.nombre = this.producto.nombre;
    this.data.descripcion = this.producto.descripcion;
    this.data.costo = this.producto.costo;
    this.data.precioVenta = this.producto.precioVenta;
    this.data.estado = this.producto.estado;
    this.data.categoria = this.producto.categoria;
    this.data.detalle = this.producto.detalle;
  }

  getMateriales() {
    this.subscriptionM = this.materialService
      .getMateriales(this.usuario)
      .subscribe((materiales) => {
        this.materiales = [];

        console.log(materiales);
        materiales.forEach((mat) => {
          if (mat.estado !== ConstStatus.eliminado) {
            this.materiales.push(mat as Material);
          }
        });
        this.materiales = this.materiales.sort((a, b) =>
          b.nombre < a.nombre ? 1 : -1
        );
      });
  }

  getCategorias() {
    this.subscriptionC = this.productoService
      .getCategorias(this.usuario)
      .subscribe((categorias) => {
        this.categorias = [];
        categorias.forEach((cat) => {
          if (cat.estado !== ConstStatus.eliminado) {
            this.categorias.push(cat as Categoria);
          }
        });
        this.categorias = this.categorias.sort((a, b) =>
          b.nombre < a.nombre ? 1 : -1
        );
        console.log('categoria', this.categoria);
        console.log('categorias', this.categorias);
        this.data.idCategoria = this.categoria.idCategoria.toString();
        console.log('data', this.data);
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
                this.data.detalle.find(
                  (r) => r.idMaterial === detalle.idMaterial
                )
              ),
              1
            );
            this.calcularCosto();

            console.log('Confirm Okay', detalle.id);
          },
        },
      ],
    });
    alert.present();
  }

  elegirMaterial() {
    console.log('elegirMaterial', this.dataDetalle.idMaterial);
    const material = this.materiales.find(
      (m) => m.idMaterial === parseInt(this.dataDetalle.idMaterial, 10)
    );
    this.material = material;
    console.log('material', this.material);
  }

  agregarDetalle() {
    console.log('materialDetalle', this.dataDetalle);
    console.log('materiales', this.materiales);

    this.data.detalle.push({
      idProdutoDetalle: Date.now(),
      idProducto: this.data.idProducto,
      idMaterial: this.material.idMaterial,
      costoPromedio: this.material.costoPromedio,
      cantidad: this.dataDetalle.cantidad,
      paraLlevar: this.dataDetalle.paraLlevar,
      afectaPrecio: this.dataDetalle.afectaPrecio,
      estado: ConstStatus.activo,
      material: this.material,
    });
    console.log('this.dataDetalle', this.data.detalle);

    this.dataDetalle.idMaterial = null;
    this.dataDetalle.cantidad = null;
    this.dataDetalle.paraLlevar = false;
    this.dataDetalle.afectaPrecio = true;
    this.data.agregandoDetalle = false;
    this.calcularCosto();
  }

  calcularCosto() {
    this.data.costo = null;
    this.data.detalle.forEach((detalle) => {
      this.data.costo += detalle.costoPromedio;
    });
  }

  async guardar() {
    let idProducto = Date.now();
    if (this.producto) {
      idProducto = this.producto.idProducto;
    }
    const categoria = this.categorias.find(
      (r) => r.idCategoria === parseInt(this.data.idCategoria, 10)
    );

    const producto: Producto = {
      idProducto,
      idCategoria: categoria.idCategoria,
      nombre: this.data.nombre,
      descripcion: this.data.descripcion,
      costo: this.data.costo,
      precioVenta: this.data.precioVenta,
      estado: ConstStatus.activo,
      categoria,
      detalle: [],
    };

    this.data.detalle.forEach((detalle) => {
      producto.detalle.push({
        idProdutoDetalle: Date.now(),
        idProducto: producto.idProducto,
        cantidad: detalle.cantidad,
        idMaterial: detalle.idMaterial,
        paraLlevar: detalle.paraLlevar,
        afectaPrecio: detalle.afectaPrecio,
        estado: ConstStatus.activo,
        costoPromedio: detalle.costoPromedio,
        material: detalle.material,
      });
    });

    console.log('Información a grabar', producto);
    await this.productoService.setProducto(this.usuario, producto);
    const toast = await this.toastController.create({
      header: 'Producto almacenado',
      message: 'El producto ' + producto.nombre,
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

  cancelar() {
    this.nav.pop();
  }
}
