import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf, *ngFor, pipe 'number'
import { ProductService, Producto } from '../../services/product'; // ¡Sintaxis simplificada!

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  standalone: true,
  imports: [CommonModule] // Imports de módulos de uso general
})
export class HomeComponent implements OnInit {
  // ... (La lógica de carga de productos del paso anterior, usando this.productService.getProductosDestacados())
  productosDestacados: Producto[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProductosDestacados();
  }
  
  loadProductosDestacados(): void {
    this.loading = true;
    this.productService.getProductosDestacados().subscribe({
      next: (data) => {
        this.productosDestacados = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Error al cargar productos.';
      }
    });
  }
}