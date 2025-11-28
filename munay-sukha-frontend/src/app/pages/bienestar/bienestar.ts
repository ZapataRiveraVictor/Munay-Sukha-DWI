import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para los inputs
import { ProductService, Producto } from '../../services/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-bienestar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bienestar.html',
  styleUrl: './bienestar.scss'
})
export class BienestarComponent implements OnInit {

  // Inputs del usuario
  peso: number | null = null; // en kg
  altura: number | null = null; // en cm

  // Resultados
  imc: number = 0;
  estado: string = '';
  colorEstado: string = '';
  mensajeDieta: string = '';

  // Productos recomendados
  allProducts: Producto[] = [];
  productosSugeridos: Producto[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    // Cargamos todos los productos para tenerlos listos para filtrar
    this.productService.getAllProductos().subscribe(data => {
      this.allProducts = data;
    });
  }

  calcularIMC() {
    if (!this.peso || !this.altura) {
      alert('Por favor, ingresa tu peso y altura.');
      return;
    }

    // Fórmula IMC: peso (kg) / altura (m)²
    const alturaMetros = this.altura / 100;
    this.imc = this.peso / (alturaMetros * alturaMetros);

    this.determinarEstado();
    this.generarRecomendaciones();
  }

  determinarEstado() {
    if (this.imc < 18.5) {
      this.estado = 'Bajo Peso';
      this.colorEstado = '#e53935'; // Rojo
      this.mensajeDieta = 'Necesitas alimentos ricos en energía y proteínas saludables para ganar masa muscular de forma sana.';
    } else if (this.imc >= 18.5 && this.imc < 24.9) {
      this.estado = 'Peso Saludable';
      this.colorEstado = '#2e7d32'; // Verde
      this.mensajeDieta = '¡Excelente! Mantén tu equilibrio con alimentos naturales, frutas secas y buena hidratación.';
    } else if (this.imc >= 25 && this.imc < 29.9) {
      this.estado = 'Sobrepeso';
      this.colorEstado = '#fb8c00'; // Naranja
      this.mensajeDieta = 'Te recomendamos reducir carbohidratos refinados y optar por snacks ligeros, infusiones y mucha fibra.';
    } else {
      this.estado = 'Obesidad';
      this.colorEstado = '#d32f2f'; // Rojo oscuro
      this.mensajeDieta = 'Es importante priorizar alimentos bajos en calorías, depurativos y evitar azúcares procesados.';
    }
  }

  generarRecomendaciones() {
    // Lógica simple de recomendación basada en palabras clave del nombre/descripción
    if (this.estado === 'Bajo Peso') {
      // Recomendar cosas calóricas/energéticas: Mantequilla de maní, Granola, Frutos secos
      this.productosSugeridos = this.allProducts.filter(p =>
        p.nombre.toLowerCase().includes('maní') ||
        p.nombre.toLowerCase().includes('granola') ||
        p.nombre.toLowerCase().includes('miel')
      );
    } else if (this.estado === 'Peso Saludable') {
      // Recomendar balanceado: Mix frutos, Miel, Yogur (si hubiera)
      this.productosSugeridos = this.allProducts.filter(p =>
        p.categoria === 'MUNAY' // Todo lo de comida saludable
      ).slice(0, 3); // Solo mostrar 3
    } else {
      // Sobrepeso/Obesidad: Recomendar detox, té, infusiones, snacks ligeros
      this.productosSugeridos = this.allProducts.filter(p =>
        p.nombre.toLowerCase().includes('infusión') ||
        p.nombre.toLowerCase().includes('té') ||
        p.nombre.toLowerCase().includes('detox') ||
        p.nombre.toLowerCase().includes('almendra') // Grasas buenas pero ligeras
      );
    }
  }

  agregarAlCarrito(producto: Producto) {
    this.cartService.addToCart(producto);
  }
}