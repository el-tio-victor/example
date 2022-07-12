import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmpleadosComponent} from './pages/empleados/empleados.component';
import {GruposComponent} from './pages/grupos/grupos.component';
import {InicioComponent} from './pages/inicio/inicio.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: 'empleados',
    component: EmpleadosComponent,
  },
  {
    path: 'grupos',
    component: GruposComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
