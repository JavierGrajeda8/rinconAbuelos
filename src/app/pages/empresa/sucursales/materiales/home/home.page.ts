import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ConstStrings } from 'src/app/core/constants/constStrings';
import { Material } from 'src/app/core/interfaces/Material';
import { Usuario } from 'src/app/core/interfaces/Usuario';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { MaterialService } from 'src/app/core/services/materiales/material.service';

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
    caduca: null,
  };
  public usuario: Usuario;
  private subscription: Subscription;

  constructor(
    private nav: NavController,
    private storage: StorageService,
    private materialService: MaterialService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.storage.get(ConstStrings.str.storage.user).then((usuario: string) => {
      this.usuario = JSON.parse(usuario) as Usuario;
      this.getMateriales();
    });
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getMateriales() {
    this.subscription = this.materialService
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

  async gestionarMaterial(material: Material) {
    console.log('material', material);
    await this.storage.set(
      ConstStrings.str.storage.material,
      JSON.stringify(material)
    );
    this.nav.navigateForward('empresas/sucursal/materiales/crear');
  }

  detalle(material: Material) {
    this.nav.navigateForward('empresas/sucursal/materiales/detalle');
  }
}
