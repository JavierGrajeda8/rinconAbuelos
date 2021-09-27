import { Component, OnInit } from '@angular/core';
import { MaterialDetalle } from 'src/app/core/interfaces/MaterialDetalle';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  public materialDetalle: MaterialDetalle[] = [];
  constructor() {}

  ngOnInit() {
    this.materialDetalle.push(
      {
        idMaterial: 0,
        idMaterialDetalle: 0,
        cantidad: 100,
        lote: 123456,
        fecha: Date.now(),
        fechaExpiracion: Date.now(),
        estado: 0,
      },
      {
        idMaterial: 0,
        idMaterialDetalle: 0,
        cantidad: 20,
        lote: 789465,
        fecha: Date.now(),
        fechaExpiracion: Date.now(),
        estado: 0,
      }
    );
  }
}
