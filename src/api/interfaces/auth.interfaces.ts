export interface LoginRequestData {
  email: string;
  contraseña: string;
}

export interface LoginResponse {
  token: string;
  nombre: string;
  apellido:string;
  email: string;
}
