import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, RegistroRequest } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = '/api/auth';
  private tokenKey = 'authToken';
  private roleKey = 'userRole'; // Clave para guardar el rol en localStorage

  constructor(private http: HttpClient) { }

  // 1. Iniciar Sesión
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          this.saveToken(response.token);
          this.saveRole(response.rol);
        }
      })
    );
  }

  // 2. Registrarse
  register(datos: RegistroRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, datos);
  }

  // --- MÉTODOS DE GESTIÓN DE TOKENS Y ROLES (Estos faltaban) ---

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // ¡ESTE ES EL QUE FALTABA!
  private saveRole(rol: string): void {
    localStorage.setItem(this.roleKey, rol);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}