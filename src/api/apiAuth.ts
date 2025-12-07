import type { LoginRequestData, LoginResponse } from "./interfaces/auth.interfaces";

export const API_URL = "http://localhost:8080/auth";


export async function loginRequest(data: LoginRequestData): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Error al iniciar sesión");
  }

  return response.json();
}

export interface RegisterRequestData {
  nombre: string;
  apellido: string
  rut: string
  email: string;
  contraseña: string;
}

export async function registerRequest(data: RegisterRequestData): Promise<string> {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Error al registrar");
  }

  return response.text();
}
