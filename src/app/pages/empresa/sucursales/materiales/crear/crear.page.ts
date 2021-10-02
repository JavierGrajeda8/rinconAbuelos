import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ConstStatus } from 'src/app/core/constants/constStatus';
import { ConstStrings } from 'src/app/core/constants/constStrings';
import { Material } from 'src/app/core/interfaces/Material';
import { Usuario } from 'src/app/core/interfaces/Usuario';
import { MaterialService } from 'src/app/core/services/materiales/material.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  public data = {
    idMaterial: null,
    nombre: '',
    unidadMedida: '',
    descripcion: '',
    cantidad: null,
    costoPromedio: null,
    caduca: null,
    estado: null,
  };
  public usuario: Usuario;
  public material: Material;
  private subscription: Subscription;

  constructor(
    private nav: NavController,
    private storage: StorageService,
    private materialService: MaterialService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.storage.get(ConstStrings.str.storage.user).then((usuario: string) => {
      this.usuario = JSON.parse(usuario) as Usuario;
      this.storage
        .get(ConstStrings.str.storage.material)
        .then((material: string) => {
          this.material = JSON.parse(material) as Material;
          console.log('material', this.material);
          if (this.material) {
            this.data.nombre = this.material.nombre;
            this.data.descripcion = this.material.descripcion;
            this.data.unidadMedida = this.material.unidadMedida;
            this.data.cantidad = this.material.cantidad;
            this.data.costoPromedio = this.material.costoPromedio;
            this.data.caduca = this.material.caduca;
            this.data.estado = this.material.estado;
          }
        });
    });
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  crear() {
    console.log('material', this.data);
    let idMaterial = Date.now();
    if (this.material) {
      idMaterial = this.material.idMaterial;
    }
    const materialAux: Material = {
      idMaterial,
      nombre: this.data.nombre,
      unidadMedida: this.data.unidadMedida,
      descripcion: this.data.descripcion,
      cantidad: this.data.cantidad,
      costoPromedio: this.data.costoPromedio,
      caduca: this.data.caduca,
      estado: ConstStatus.activo,
    };

    this.materialService
      .setMaterial(this.usuario, materialAux)
      .then(async () => {
        const toast = await this.toastController.create({
          header: 'Material almacenado',
          message: 'El material ' + materialAux.nombre,
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
      });
  }

  cancelar() {
    this.nav.pop();
  }
}
