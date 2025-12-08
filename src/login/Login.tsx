import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api/apiAuth";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginRequest({ email, contraseña });

      // Guardar datos del usuario
      localStorage.setItem("token", data.token);
      localStorage.setItem("userNombre", data.nombre);
      localStorage.setItem("userApellido", data.apellido);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("clienteID", data.id);
      localStorage.setItem("userRut", data.rut)

      navigate("/"); // Redirige al home
    } catch (err: unknown) {
       if (err instanceof Error) {
         setError(err.message);
       } else {
         setError("Error al iniciar sesión");
       }
    }
  };

  return (
    <div className="container-fluid p-0">
      <Row className="g-0 vh-100">
        {/* Imagen */}
        <Col md={6} className="d-none d-md-block">
          <img
            src="https://tcg.pokemon.com/assets/img/home/featured-switcher/booster-art-1-large-up.jpg"
            alt="login"
            className="img-fluid w-100 h-100 object-fit-cover"
          />
        </Col>

        {/* Formulario */}
        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center p-4 bg-light"
        >
          <div className="w-75">
            <h3 className="text-center mb-4">Iniciar Sesión</h3>

            {error && <p className="text-danger text-center">{error}</p>}

            <Form onSubmit={handleSubmit}>
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

              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Tu contraseña"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  required
                />
              </Form.Group>

              <Button className="w-100 mb-2" variant="primary" type="submit">
                Entrar
              </Button>

              <div className="text-center">
                <small>¿No tienes cuenta?</small>
                <br />
                <a href="/registro">Crear cuenta</a>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};
