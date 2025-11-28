import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class AdminComponent implements OnInit {

  pedidos: any[] = [];
  loading: boolean = true;
  errorMensaje: string = '';

  // Variable para saber qué pedido está expandido (viendo detalles)
  expandedPedidoId: number | null = null;

  // Lista de estados posibles para el select
  estadosPosibles = ['PENDIENTE', 'PROCESANDO', 'ENVIADO', 'ENTREGADO', 'CANCELADO'];

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const role = this.authService.getUserRole();
    if (role !== 'ROLE_ADMIN') {
      alert('Acceso denegado. Solo administradores.');
      this.router.navigate(['/']);
      return;
    }
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.loading = true;
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.pedidos = data;
        this.loading = false;
        console.log('Pedidos cargados:', data);

        this.cd.detectChanges(); 
      },
      error: (err) => {
        console.error(err);
        this.errorMensaje = 'No se pudieron cargar los pedidos.';
        this.loading = false;
        this.cd.detectChanges(); 
      }
    });
  }

  // Alternar visibilidad de detalles
  toggleDetalles(id: number) {
    if (this.expandedPedidoId === id) {
      this.expandedPedidoId = null; // Cerrar si ya está abierto
    } else {
      this.expandedPedidoId = id; // Abrir
    }
  }

  // Cambiar estado
  cambiarEstado(pedido: any, nuevoEstado: string) {
    if (!confirm(`¿Seguro que quieres cambiar el estado a ${nuevoEstado}?`)) {
      // Si cancela, recargamos para volver al estado anterior visualmente
      this.cargarPedidos(); 
      return;
    }

    this.orderService.updateOrderStatus(pedido.id, nuevoEstado).subscribe({
      next: () => {
        pedido.estado = nuevoEstado; // Actualizamos visualmente
        alert('Estado actualizado correctamente.');
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
        alert('Error al actualizar estado.');
      }
    });
  }
}