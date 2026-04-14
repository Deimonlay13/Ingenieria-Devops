import type { LoginRequestData, LoginResponse, RegisterRequestData } from "./interfaces/auth.interfaces";

export const API_URL = "http://localhost:8080/auth";


export async function loginRequest(data: LoginRequestData): Promise<LoginResponse> {
  try {
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
  } catch (error) {
    console.warn("Login API no disponible, usando fallback local:", error);
    return {
      id: "1",
      token: "mock-token-local",
      nombre: localStorage.getItem("userNombre") || "Entrenador",
      apellido: localStorage.getItem("userApellido") || "Pokemon",
      email: data.email,
      rut: localStorage.getItem("userRut") || "11.111.111-1",
    };
  }
}

export async function registerRequest(data: RegisterRequestData): Promise<string> {
  try {
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
  } catch (error) {
    console.warn("Register API no disponible, usando fallback local:", error);
    return "Registro mock exitoso (modo sin backend)";
  }
}
