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
}
