import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home'; 

export const routes: Routes = [
  { path: '', component: HomeComponent },
  
  // Ruta de Login con Lazy Loading
  { 
    path: 'login', 
    loadComponent: () => import('./auth/login/login').then(c => c.LoginComponent) 
  },
  // Ruta de Registro con Lazy Loading
  { 
    path: 'register', 
    loadComponent: () => import('./auth/register/register').then(c => c.RegisterComponent) 
  },
  
  // ... otras rutas
];