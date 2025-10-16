import { Routes } from '@angular/router';

import { LoginRegisterComponent } from './views/login-register/login-register.component';
import { HomeComponent } from './views/home/home.component';
import { ListaProductosComponent } from './views/lista-productos/lista-productos.component';
import { DetalleProductoComponent } from './views/detalle-producto/detalle-producto.component';
import { ListaCategoriasComponent } from './views/lista-categorias/lista-categorias.component';
import { DetalleCategoriaComponent } from './views/detalle-categoria/detalle-categoria.component';
import { ReportesComponent } from './views/reportes/reportes.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { sesionGuardGuard } from './guards/sesion-guard.guard';
import { sesionGuardChildGuard } from './guards/sesion-guard-child.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, //TODO: En realidad aqui iria landing page
  { path: 'login', component: LoginRegisterComponent },
  {
    path: 'app',
    canActivate: [sesionGuardGuard],
    canActivateChild: [sesionGuardChildGuard],
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'lista-productos', pathMatch: 'full' }, //TODO: En realidad aqui iria dashboard page
      { path: 'lista-productos', component: ListaProductosComponent },
      { path: 'detalle-alarma', component: DetalleProductoComponent },
      { path: 'detalle-alarma/:id', component: DetalleProductoComponent },
      { path: 'lista-categorias', component: ListaCategoriasComponent },
      { path: 'detalle-categoria', component: DetalleCategoriaComponent },
      { path: 'detalle-categoria/:id', component: DetalleCategoriaComponent },
      { path: 'reportes', component: ReportesComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
