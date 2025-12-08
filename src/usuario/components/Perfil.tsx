import React, { useEffect, useState } from "react";
import type { User } from "../../api/interfaces/auth.interfaces";
import { deleteUser, getUserById, updateUser } from "../../api/userServer";

const Perfil = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const userId = localStorage.getItem("clienteID");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(userId);
        setUser({ ...data, contraseña: "" }); // no mostrar contraseña real
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (user) setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    if (!user) return;

    // Validaciones
    if (!user.nombre.trim() || !user.apellido.trim()) {
      setMessage("Nombre y apellido no pueden estar vacíos");
      return;
    }
    if (user.contraseña && user.contraseña.length < 6) {
      setMessage("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      await updateUser(user.idUsuario, {
        nombre: user.nombre,
        apellido: user.apellido,
        contraseña: user.contraseña,
      });
      setMessage("Perfil actualizado correctamente");
    } catch {
      setMessage(message);
    }
  };

  const handleDelete = async () => {
    if (!user) return;

    try {
      await deleteUser(user.idUsuario);
      localStorage.clear();
      window.location.href = "/";
    } catch {
      alert("Error al eliminar la cuenta");
    }
  };

  if (loading) return <p>Cargando perfil...</p>;
  if (!user) return <p>No hay información de usuario.</p>;

  return (
    <div
      className="container mt-4 bg-white bg-opacity-75 p-4 rounded shadow"
      style={{ maxWidth: "500px" }}
    >
      <h2>Mi Perfil</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={user.email}
          disabled
        />
      </div>

      <div className="mb-3">
        <label>RUT</label>
        <input type="text" className="form-control" value={user.rut} disabled />
      </div>

      <div className="mb-3">
        <label>Nombre</label>
        <input
          type="text"
          className="form-control"
          name="nombre"
          value={user.nombre}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Apellido</label>
        <input
          type="text"
          className="form-control"
          name="apellido"
          value={user.apellido}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Contraseña</label>
        <input
          type="password"
          className="form-control"
          name="contraseña"
          value={user.contraseña}
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-primary w-100 mb-2" onClick={handleSubmit}>
        Guardar
      </button>

      <button
        className="btn btn-danger w-100"
        onClick={() => setShowModal(true)}
      >
        Eliminar cuenta
      </button>

      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar eliminación</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  ¿Estás seguro de que quieres eliminar tu cuenta? Esta acción
                  no se puede deshacer.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
