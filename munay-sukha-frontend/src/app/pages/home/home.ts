import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Producto } from '../../services/product';
import { CartService } from '../../services/cart'; // Revisa que la ruta sea correcta según tus carpetas

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit { // El error dice que tu clase se llama 'Home'

  productos: Producto[] = [];
  errorMensaje: string = '';

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.productService.getAllProductos().subscribe({
      next: (data) => {
        this.productos = data;
        console.log('Productos cargados:', data);
      },
      error: (err) => {
        console.error('Error:', err);
        // Asegúrate de usar 'this.errorMensaje' aquí también
        this.errorMensaje = 'No se pudo conectar con el Backend.';
      }
    });
  }
  agregarAlCarrito(producto: Producto) {
    this.cartService.addToCart(producto);
  }
}