import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = '/api/auth'; // Prefijo del backend
  private tokenKey = 'authToken'; // Nombre para guardar en localStorage

  constructor(private http: HttpClient) { }

  // 1. Método para Iniciar Sesión
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Si la respuesta es exitosa, guardamos el token automáticamente
        if (response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }

  // 2. Guardar Token en el navegador
  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // 3. Obtener Token (lo usaremos luego para el carrito)
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // 4. Cerrar Sesión
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // 5. Verificar si está logueado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
} 