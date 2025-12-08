import type { User } from "./interfaces/auth.interfaces";


const API_URL = "http://localhost:8080/usuario";

export const getUserById = async (id: string | null): Promise<User> => {
    if (!id) throw new Error("No se proporcionó un ID de usuario");
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Error al obtener el usuario");
    return res.json();
};

export const updateUser = async (id: number, data: Partial<User>) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al actualizar el perfil");
    return res.json();
};

export const deleteUser = async (id: number) => {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar la cuenta");
};
