import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Producto } from '../../services/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.scss'
})
export class CatalogoComponent implements OnInit {

  // Datos crudos del backend
  allProducts: Producto[] = [];

  // Datos filtrados por categoría
  filteredProducts: Producto[] = [];

  // Datos que se ven en la página actual (Paginados)
  paginatedProducts: Producto[] = [];

  // Configuración
  categoryFilter: string = 'TODOS'; // 'TODOS', 'MUNAY', 'SUKHA'
  currentPage: number = 1;
  pageSize: number = 8; // Cuántos productos por página
  totalPages: number = 0;
  pagesArray: number[] = []; // Para dibujar los botoncitos [1, 2, 3]

  loading: boolean = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getAllProductos().subscribe({
      next: (data) => {
        this.allProducts = data;
        this.applyFilter(); // Aplicar filtro inicial (Todos)
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

  // 1. Lógica de Filtrado
  setCategory(category: string) {
    this.categoryFilter = category;
    this.currentPage = 1; // Resetear a página 1 al cambiar filtro
    this.applyFilter();
  }

  applyFilter() {
    if (this.categoryFilter === 'TODOS') {
      this.filteredProducts = this.allProducts;
    } else {
      this.filteredProducts = this.allProducts.filter(p =>
        p.categoria.toUpperCase() === this.categoryFilter
      );
    }
    this.calculatePagination();
  }

  // 2. Lógica de Paginación
  calculatePagination() {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
    this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updateView();
  }

  updateView() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateView();
      window.scrollTo(0, 0); // Subir al inicio al cambiar página
    }
  }

  // Acción del carrito
  agregarAlCarrito(producto: Producto) {
    this.cartService.addToCart(producto);
    alert('Producto agregado al carrito');
  }
}