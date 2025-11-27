import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definimos la estructura de tus datos aquí para que sea visible
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
  // Usamos el proxy, por eso solo ponemos /api/...
  private apiUrl = '/api/productos';

  constructor(private http: HttpClient) { }

  // Método simple para obtener todos los productos
  getAllProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }
}