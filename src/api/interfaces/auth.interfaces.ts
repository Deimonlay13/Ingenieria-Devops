export interface LoginRequestData {
  email: string;
  contraseña: string;
}

export interface LoginResponse {
  id: string;
  token: string;
  nombre: string;
  apellido:string;
  email: string;
  rut: string;
}


export interface RegisterRequestData {
  nombre: string;
  apellido: string
  rut: string
  email: string;
  contraseña: string;
}

export interface User {
  idUsuario: number;
  nombre: string;
  apellido: string;
  email: string;
  rut: string;
  contraseña: string;
}
