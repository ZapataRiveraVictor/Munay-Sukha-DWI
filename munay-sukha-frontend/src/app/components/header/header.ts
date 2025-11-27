import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive], // Importar módulos de rutas
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  userEmail: string | null = '';
  cartCount: number = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. Verificar si está logueado al iniciar
    this.checkLoginStatus();

    // 2. Suscribirse al carrito para actualizar el contador
    this.cartService.cart$.subscribe(items => {
      // Sumamos la cantidad de todos los items
      this.cartCount = items.reduce((acc, item) => acc + item.cantidad, 0);
    });
  }

  checkLoginStatus() {
    this.isLoggedIn = this.authService.isLoggedIn();
    // Si guardaste el email en localStorage, podrías recuperarlo aquí
    // this.userEmail = localStorage.getItem('userEmail'); 
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}