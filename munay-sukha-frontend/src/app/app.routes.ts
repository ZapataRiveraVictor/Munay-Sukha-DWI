import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta raíz
  { path: '**', redirectTo: '' } // Cualquier ruta desconocida va al home
];