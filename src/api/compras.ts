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
// ✅ Exportar la función para guardar venta
export async function guardarVenta(cart: ItemCarrito[], totalAmount: number) {
    try {
        const idUsuario = localStorage.getItem("clienteID");
        if (!idUsuario) throw new Error("Usuario no encontrado");

        // 1️⃣ Crear la venta
        const ventaRes = await axios.post(`${API_URL}/venta`, {
            idUsuario: Number(idUsuario),
            total: totalAmount
        });

        const idVenta = ventaRes.data.idVenta; // Asegúrate que tu DTO devuelva este campo

        // 2️⃣ Crear cada detalle
        for (const item of cart) {
            await axios.post(`${API_URL}/detalle-venta`, {
                idVenta,
                idCarta: item.carta.id,
                cantidad: item.cantidad,
                precio: item.carta.precio
            });
        }

        console.log("Venta y detalles guardados correctamente");

    } catch (error) {
        console.error("Error guardando la venta:", error);
        throw error; // Para poder manejarlo desde el componente
    }
};
