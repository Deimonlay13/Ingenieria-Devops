import axios from "axios";
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
type ItemCarrito = {
    carta: { id: number; nombre: string; precio: number; img: string };
    cantidad: number;
};

export async function guardarVenta(cart: ItemCarrito[], totalAmount: number) {
    try {
        const idUsuario = localStorage.getItem("clienteID");
        if (!idUsuario) throw new Error("Usuario no encontrado");

        const ventaData = {
            idUsuario: Number(idUsuario),
            total: totalAmount,
            detalles: cart.map(item => ({
                idProducto: item.carta.id,
                cantidad: item.cantidad,
                precio: item.carta.precio
            }))
        };

        const res = await axios.post(`${API_URL}/venta`, ventaData);

        console.log("Venta completa guardada:", res.data);
        return res.data;

    } catch (error) {
        console.error("Error guardando la venta:", error);
        throw error;
    }
}

