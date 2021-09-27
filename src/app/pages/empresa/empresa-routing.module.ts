import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'crear',
    loadChildren: () => import('./crear/crear.module').then(m => m.CrearPageModule)
  },
  {
    path: 'sucursal',
    loadChildren: () => import('./sucursales/sucursal.module').then(m => m.SucursalAppPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresaPageRoutingModule {}
