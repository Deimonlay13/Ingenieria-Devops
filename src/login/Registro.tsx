import { useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { registerRequest } from "../api/apiAuth";
import { useNavigate } from "react-router-dom";

export const Registro = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMensaje(null);
    setError(null);

    try {
      const response = await registerRequest({
        nombre,
        apellido,
        rut,
        email,
        contraseña: password,
      });

      // Mensaje temporal
      setMensaje(response || "Registro exitoso 🎉 Redirigiendo...");

      // Redirige al login después de 1.5 segundos
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err: unknown) {
        const e = err as { message?: string };
        setError(e.message ?? "Error al registrar");
    }
  }

  return (
    <div className="container-fluid p-0">
      <Row className="g-0 vh-100">
        {/* Imagen */}
        <Col md={6} className="d-none d-md-block">
          <img
            src="https://tcg.pokemon.com/assets/img/home/featured-switcher/booster-art-1-large-up.jpg"
            alt="register"
            className="img-fluid w-100 h-100 object-fit-cover"
          />
        </Col>

        {/* Formulario */}
        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center p-4 bg-light"
        >
          <div className="w-75">
            <h3 className="text-center mb-4">Crear Cuenta</h3>

            {mensaje && <Alert variant="success">{mensaje}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tu apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>RUT</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="11.111.111-1"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="correo@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button className="w-100 mb-2" variant="success" type="submit">
                Registrarse
              </Button>

              <div className="text-center">
                <small>¿Ya tienes cuenta?</small>
                <br />
                <a href="/login">Iniciar sesión</a>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};
