import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { CartComponent } from './pages/cart/cart';
import { CheckoutComponent } from './pages/checkout/checkout';
import { AdminComponent } from './pages/admin/admin';
import { RegisterComponent } from './pages/register/register';
import { CatalogoComponent } from './pages/catalogo/catalogo';

export const routes: Routes = [
  { path: '', component: Home }, // Ruta raíz
  { path: 'login', component: Login },
  { path: 'carrito', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'catalogo', component: CatalogoComponent },
  { path: '**', redirectTo: '' } // Cualquier ruta desconocida va al home
];