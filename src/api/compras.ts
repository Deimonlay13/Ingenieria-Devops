import axios from "axios";
import type { Detalle, Venta } from "./interfaces/compras.interface";

const API_URL = "http://localhost:8080";
const FALLBACK_VENTAS_KEY = "mock_ventas";
const FALLBACK_DETALLES_KEY = "mock_detalles_venta";

const getFallbackVentas = (): Venta[] => {
    const saved = localStorage.getItem(FALLBACK_VENTAS_KEY);
    return saved ? (JSON.parse(saved) as Venta[]) : [];
};

const getFallbackDetalles = (): Record<number, Detalle[]> => {
    const saved = localStorage.getItem(FALLBACK_DETALLES_KEY);
    return saved ? (JSON.parse(saved) as Record<number, Detalle[]>) : {};
};

export async function getVentasByUsuario(idUsuario: string | null): Promise<Venta[]> {
    if (!idUsuario) return [];
    try {
        const res = await fetch(`${API_URL}/venta/usuario/${idUsuario}`);
        if (!res.ok) throw new Error("Error al obtener compras");
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.warn("Ventas API no disponible, usando fallback local:", error);
        return getFallbackVentas().filter((venta) => String(venta.idUsuario) === idUsuario);
    }
}

export async function getDetallesByVenta(idVenta: number): Promise<Detalle[]> {
    try {
        const res = await fetch(`${API_URL}/detalle-venta/venta/${idVenta}`);
        if (!res.ok) throw new Error("Error al obtener detalle de compra");
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.warn("Detalle API no disponible, usando fallback local:", error);
        const detalles = getFallbackDetalles();
        return detalles[idVenta] ?? [];
    }
}
type ItemCarrito = {
    carta: { id: number | string; nombre: string; precio: number; img: string };
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
        console.warn("Guardar venta API no disponible, usando fallback local:", error);

        const idUsuario = Number(localStorage.getItem("clienteID") ?? "1");
        const ventas = getFallbackVentas();
        const detalleMap = getFallbackDetalles();
        const nextVentaId = ventas.length ? Math.max(...ventas.map((v) => v.idVenta)) + 1 : 1;

        const venta: Venta = {
            idVenta: nextVentaId,
            idUsuario,
            fechaCreacion: new Date().toISOString(),
            total: totalAmount,
        };

        const detalles: Detalle[] = cart.map((item, index) => ({
            idDetalle: nextVentaId * 100 + index + 1,
            idVenta: nextVentaId,
            idCarta: Number(item.carta.id) || index + 1,
            cantidad: item.cantidad,
            precio: item.carta.precio,
            imagenProducto: item.carta.img,
            nombreProducto: item.carta.nombre,
        }));

        const nuevasVentas = [...ventas, venta];
        const nuevosDetalles = { ...detalleMap, [nextVentaId]: detalles };
        localStorage.setItem(FALLBACK_VENTAS_KEY, JSON.stringify(nuevasVentas));
        localStorage.setItem(FALLBACK_DETALLES_KEY, JSON.stringify(nuevosDetalles));

        return venta;
    }
}

