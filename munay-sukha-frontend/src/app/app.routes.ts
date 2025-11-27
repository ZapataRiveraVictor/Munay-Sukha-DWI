import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { CartComponent } from './pages/cart/cart';
import { CheckoutComponent } from './pages/checkout/checkout';
import { AdminComponent } from './pages/admin/admin';

export const routes: Routes = [
  { path: '', component: Home }, // Ruta raíz
  { path: 'login', component: Login },
  { path: 'carrito', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'admin', component: AdminComponent }, 
  { path: '**', redirectTo: '' } // Cualquier ruta desconocida va al home
];