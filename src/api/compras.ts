import type { Detalle, Venta } from "./interfaces/compras.interface";

const API_URL = "http://localhost:8080";

export async function getVentasByUsuario(idUsuario: string | null): Promise<Venta[]> {
    if (!idUsuario) return [];
    const res = await fetch(`${API_URL}/venta/usuario/${idUsuario}`);
    if (!res.ok) throw new Error("Error al obtener compras");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
}

export async function getDetallesByVenta(idVenta: number): Promise<Detalle[]> {
    const res = await fetch(`${API_URL}/detalle-venta/venta/${idVenta}`);
    if (!res.ok) throw new Error("Error al obtener detalle de compra");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
}