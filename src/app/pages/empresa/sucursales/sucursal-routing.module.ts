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
    path: 'gastos',
    loadChildren: () => import('./gastos/gastos.module').then(m => m.GastosAppPageModule)
  },
  {
    path: 'ventas',
    loadChildren: () => import('./ventas/ventas.module').then(m => m.VentasAppPageModule)
  },
  {
    path: 'materiales',
    loadChildren: () => import('./materiales/materiales.module').then(m => m.MaterialesAppPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasAppPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SucursalPageRoutingModule {}
