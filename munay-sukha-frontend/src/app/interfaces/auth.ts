// src/app/interfaces/auth.ts

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    email: string;
    rol: string;
    // Puedes agregar 'rol' o 'id' si tu backend los devuelve
}

export interface RegistroRequest {
    nombreCompleto: string;
    email: string;
    password: string;
}