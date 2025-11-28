import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { OrderService } from '../../services/order';
import { ProductService, Producto } from '../../services/product'; 
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

  // Vista actual: 'pedidos' o 'productos'
  currentView: string = 'pedidos';

  // Datos
  pedidos: any[] = [];
  productos: Producto[] = [];

  // Objeto para el formulario de nuevo producto
  newProduct: Producto = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    categoria: 'MUNAY', // Valor por defecto
    urlImagen: ''
  };

  loading: boolean = false;
  showModal: boolean = false; // Para abrir/cerrar el formulario

  constructor(
    private orderService: OrderService,
    private productService: ProductService, // <--- Inyectar
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.authService.getUserRole() !== 'ROLE_ADMIN') {
      this.router.navigate(['/']);
      return;
    }
    this.loadData();
  }

  // Cambiar pestaña
  switchView(view: string) {
    this.currentView = view;
    this.loadData();
  }

  loadData() {
    this.loading = true;
    if (this.currentView === 'pedidos') {
      // Cargar Pedidos
      this.orderService.getAllOrders().subscribe(data => {
        this.pedidos = data;
        this.loading = false;
        this.cd.detectChanges();
      });
    } else {
      // Cargar Productos (Inventario)
      this.productService.getAllProductos().subscribe(data => {
        this.productos = data;
        this.loading = false;
        this.cd.detectChanges();
      });
    }
  }

  // --- LÓGICA DE PRODUCTOS ---

  openProductModal() {
    this.showModal = true;
  }

  closeProductModal() {
    this.showModal = false;
    // Resetear formulario
    this.newProduct = { id: 0, nombre: '', descripcion: '', precio: 0, stock: 0, categoria: 'MUNAY', urlImagen: '' };
  }

  saveProduct() {
    this.productService.createProduct(this.newProduct).subscribe({
      next: (res) => {
        alert('Producto creado exitosamente');
        this.closeProductModal();
        this.loadData(); // Recargar la lista
      },
      error: (err) => {
        console.error(err);
        alert('Error al crear producto');
      }
    });
  }

  deleteProduct(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadData();
      });
    }
  }

  // ... (Tus métodos existentes de cambiar estado de pedido siguen aquí) ...
}