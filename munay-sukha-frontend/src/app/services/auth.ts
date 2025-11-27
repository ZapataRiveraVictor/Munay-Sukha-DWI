import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, JwtResponse, RegistroRequest } from '../interfaces/auth'; // Importación limpia

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = '/api/auth';
  private TOKEN_KEY = 'auth-token';

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, credentials);
  }
  
  register(user: RegistroRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
}