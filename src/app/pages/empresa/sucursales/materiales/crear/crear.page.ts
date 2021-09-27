import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Material } from 'src/app/core/interfaces/Material';

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
    estado: null
  };

  constructor(private nav: NavController) { }

  ngOnInit() {
  }

  cancelar() {
    this.nav.pop();
  }

}
