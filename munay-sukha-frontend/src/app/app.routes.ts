import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login'

export const routes: Routes = [
  { path: '', component: Home }, // Ruta raíz
  { path: 'login', component: Login },
  { path: '**', redirectTo: '' } // Cualquier ruta desconocida va al home
];