import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class AdminComponent implements OnInit {

  pedidos: any[] = [];

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Protección básica: Si no es admin, fuera (Idealmente usar un Guard)
    // Aquí asumimos que si el backend responde es porque tiene permiso
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.pedidos = data;
        console.log('Pedidos cargados:', data);
      },
      error: (err) => {
        console.error(err);
        alert('No tienes permisos de administrador o hubo un error.');
        this.router.navigate(['/']);
      }
    });
  }
}