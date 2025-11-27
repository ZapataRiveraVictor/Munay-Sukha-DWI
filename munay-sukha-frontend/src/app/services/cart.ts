import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from './product'; // Importamos la interfaz del producto

// Definimos qué es un ítem del carrito
export interface CartItem {
  producto: Producto;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // La fuente de la verdad (estado privado)
  private cartItems = new BehaviorSubject<CartItem[]>([]);

  // Lo que los componentes ven (observable público)
  cart$ = this.cartItems.asObservable();

  constructor() { }

  // 1. Agregar producto
  addToCart(producto: Producto) {
    const currentItems = this.cartItems.value;
    const itemExistente = currentItems.find(item => item.producto.id === producto.id);

    if (itemExistente) {
      // Si ya existe, sumamos 1
      itemExistente.cantidad++;
      this.cartItems.next([...currentItems]); // Emitimos el cambio
    } else {
      // Si es nuevo, lo agregamos
      this.cartItems.next([...currentItems, { producto, cantidad: 1 }]);
    }

    console.log('Carrito actual:', this.cartItems.value); // Para depurar
    alert('Producto agregado al carrito'); // Feedback simple por ahora
  }

  // 2. Eliminar producto
  removeFromCart(productId: number) {
    const filteredItems = this.cartItems.value.filter(item => item.producto.id !== productId);
    this.cartItems.next(filteredItems);
  }

  // 3. Calcular Total
  getTotal(): number {
    return this.cartItems.value.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
  }

  // 4. Vaciar carrito (para cuando compre)
  clearCart() {
    this.cartItems.next([]);
  }

  // 5. Obtener items actuales (snapshot)
  getItems() {
    return this.cartItems.value;
  }
}