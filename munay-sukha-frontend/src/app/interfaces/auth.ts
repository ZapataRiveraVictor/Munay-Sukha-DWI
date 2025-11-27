// src/app/interfaces/auth.ts

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    email: string;
    // Puedes agregar 'rol' o 'id' si tu backend los devuelve
}