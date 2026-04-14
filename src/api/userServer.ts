import type { User } from "./interfaces/auth.interfaces";


const API_URL = "http://localhost:8080/usuario";
const FALLBACK_USER_KEY = "mock_user_profile";

const getFallbackUser = (id: string | null): User => {
    const saved = localStorage.getItem(FALLBACK_USER_KEY);
    if (saved) return JSON.parse(saved) as User;

    return {
        idUsuario: Number(id ?? localStorage.getItem("clienteID") ?? 1),
        nombre: localStorage.getItem("userNombre") || "Entrenador",
        apellido: localStorage.getItem("userApellido") || "Pokemon",
        email: localStorage.getItem("userEmail") || "entrenador@pokemon.com",
        rut: localStorage.getItem("userRut") || "11.111.111-1",
        contraseña: "",
    };
};

export const getUserById = async (id: string | null): Promise<User> => {
    if (!id) throw new Error("No se proporcionó un ID de usuario");
    try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("Error al obtener el usuario");
        const user = await res.json();
        localStorage.setItem(FALLBACK_USER_KEY, JSON.stringify(user));
        return user;
    } catch (error) {
        console.warn("User API no disponible, usando fallback local:", error);
        return getFallbackUser(id);
    }
};

export const updateUser = async (id: number, data: Partial<User>) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Error al actualizar el perfil");
        const updated = await res.json();
        localStorage.setItem(FALLBACK_USER_KEY, JSON.stringify(updated));
        return updated;
    } catch (error) {
        console.warn("Update user API no disponible, usando fallback local:", error);
        const current = getFallbackUser(String(id));
        const updated = { ...current, ...data };
        localStorage.setItem(FALLBACK_USER_KEY, JSON.stringify(updated));
        localStorage.setItem("userNombre", updated.nombre);
        localStorage.setItem("userApellido", updated.apellido);
        localStorage.setItem("userEmail", updated.email);
        localStorage.setItem("userRut", updated.rut);
        return updated;
    }
};

export const deleteUser = async (id: number) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Error al eliminar la cuenta");
    } catch (error) {
        console.warn("Delete user API no disponible, usando fallback local:", error);
        localStorage.removeItem(FALLBACK_USER_KEY);
    }
};
