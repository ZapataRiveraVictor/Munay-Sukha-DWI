import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // CRUCIAL para directivas básicas
import { ProductService, Producto } from '../../services/product';

@Component({
  selector: 'app-home',
  standalone: true, // Esto indica que es moderno
  imports: [CommonModule], // Importamos las herramientas básicas aquí
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {
  
  productos: Producto[] = [];
  mensajeError: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Al iniciar, pedimos los datos al backend
    this.productService.getAllProductos().subscribe({
      next: (data) => {
        this.productos = data;
        console.log('Productos cargados:', data);
      },
      error: (error) => {
        console.error('Error conectando al backend:', error);
        this.mensajeError = 'No se pudo conectar con el Backend (Spring Boot).';
      }
    });
  }
}