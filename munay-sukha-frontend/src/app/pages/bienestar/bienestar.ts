import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ProductService, Producto } from '../../services/product'; // Ajusta la ruta si es necesario
import { CartService } from '../../services/cart'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-bienestar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bienestar.html',
  styleUrl: './bienestar.scss'
})
export class BienestarComponent implements OnInit {

  // Inputs
  peso: number | null = null;
  altura: number | null = null;

  // Resultados
  imc: number = 0;
  estado: string = '';
  colorClass: string = ''; // Cambiado: Usaremos clases CSS en vez de Hex para mejor diseño
  mensajeDieta: string = '';
  mostrarResultado: boolean = false; // Para la animación

  // Datos
  allProducts: Producto[] = [];
  productosSugeridos: Producto[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.productService.getAllProductos().subscribe(data => {
      this.allProducts = data;
    });
  }

  calcularIMC() {
    if (!this.peso || !this.altura) {
      // Opcional: Podrías usar una variable para mostrar error en el HTML en vez de alert
      return; 
    }

    const alturaMetros = this.altura / 100;
    this.imc = this.peso / (alturaMetros * alturaMetros);

    this.determinarEstado();
    this.generarRecomendaciones();
    this.mostrarResultado = true; // Activar animación
  }

  determinarEstado() {
    // Asignamos clases CSS para estilos completos (fondo, borde, texto)
    if (this.imc < 18.5) {
      this.estado = 'Bajo Peso';
      this.colorClass = 'danger'; // Rojo
      this.mensajeDieta = 'Necesitas alimentos ricos en energía y proteínas saludables para ganar masa muscular de forma sana.';
    } else if (this.imc >= 18.5 && this.imc < 24.9) {
      this.estado = 'Peso Saludable';
      this.colorClass = 'success'; // Verde
      this.mensajeDieta = '¡Excelente! Mantén tu equilibrio con alimentos naturales, frutas secas y buena hidratación.';
    } else if (this.imc >= 25 && this.imc < 29.9) {
      this.estado = 'Sobrepeso';
      this.colorClass = 'warning'; // Naranja
      this.mensajeDieta = 'Te recomendamos reducir carbohidratos refinados y optar por snacks ligeros, infusiones y mucha fibra.';
    } else {
      this.estado = 'Obesidad';
      this.colorClass = 'danger'; // Rojo
      this.mensajeDieta = 'Es importante priorizar alimentos bajos en calorías, depurativos y evitar azúcares procesados.';
    }
  }

  generarRecomendaciones() {
    if (this.allProducts.length === 0) return;

    if (this.estado === 'Bajo Peso') {
      this.productosSugeridos = this.allProducts.filter(p =>
        p.nombre.toLowerCase().includes('maní') ||
        p.nombre.toLowerCase().includes('granola') ||
        p.nombre.toLowerCase().includes('miel')
      ).slice(0, 3);
    } else if (this.estado === 'Peso Saludable') {
      this.productosSugeridos = this.allProducts.filter(p =>
        p.categoria === 'MUNAY'
      ).slice(0, 3);
    } else {
      this.productosSugeridos = this.allProducts.filter(p =>
        p.nombre.toLowerCase().includes('infusión') ||
        p.nombre.toLowerCase().includes('té') ||
        p.nombre.toLowerCase().includes('detox') ||
        p.nombre.toLowerCase().includes('almendra')
      ).slice(0, 3);
    }
  }

  agregarAlCarrito(producto: Producto) {
    this.cartService.addToCart(producto);
    // Feedback visual opcional
    alert('Producto agregado para tu bienestar');
  }
}