import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz que coincide con tu entidad Producto.java
export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  urlImagen: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = '/api/productos'; // Usará el proxy

  constructor(private http: HttpClient) { }

  // GET: /api/productos/destacados
  getProductosDestacados(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/destacados`);
  }
  
  // GET: /api/productos/categoria/{categoria}
  getProductosByCategoria(categoria: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/categoria/${categoria}`);
  }
}