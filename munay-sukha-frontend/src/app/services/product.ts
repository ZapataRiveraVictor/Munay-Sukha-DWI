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

  private apiUrl = '/api/productos';

  constructor(private http: HttpClient) { }

  getAllProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getProductosDestacados(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/destacados`);
  }

  createProduct(producto: Producto): Observable<Producto> {
    // Si tienes autenticación, aquí deberías pasar el token en los headers igual que en OrderService
    // Pero como la ruta /api/productos suele ser pública para GET, asegúrate de que el POST requiera token
    // O usa un interceptor. Por simplicidad ahora, lo mandamos directo.
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  // Eliminar Producto
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}