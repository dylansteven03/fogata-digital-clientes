import { Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes/clientes';

export const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClientesComponent },
  // y las demás rutas de detalle o formulario si las tienes...
];
