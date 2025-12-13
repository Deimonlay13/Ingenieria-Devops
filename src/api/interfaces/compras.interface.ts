export interface Detalle {
    idDetalle: number;
    idVenta: number;
    idCarta: number;
    cantidad: number;
    precio: number;
    imagenProducto?: string;
    nombreProducto?: string;
}

export interface Venta {
    idVenta: number;
    idUsuario: number;
    fechaCreacion: string;
    total: number;
}
