import { Form, Row, Col, Button, Container, Alert } from "react-bootstrap";
import "./Formulario.css";
import { useState, type FormEvent } from "react";
import { useCart } from "../../cartas/context/CartContext";

export const Formulario = () => {
  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { cart, totalAmount } = useCart();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity()) {
      setValidated(true);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3500);
    } else {
      event.stopPropagation();
      setValidated(true);
      setShowSuccess(false);
    }
  };

  return (
    <Container className="py-4">
      <Row>
        <Col md={8}>
          <div className="p-3 border rounded bg-light">
            <h5 className="mb-3">Completa tus datos para procesar tu compra</h5>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Correo electrónico *</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="correo@ejemplo.com"
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa un correo válido.
                </Form.Control.Feedback>
              </Form.Group>
            

              <div className="alert alert-info py-2">
                Usaremos estos datos para verificar tu identidad y enviarte información de tu compra.
              </div>

              <h6 className="mt-4">¿Cuál es tu nombre?</h6>

              <Form.Group className="mb-3">
                <Form.Label>Nombre *</Form.Label>
                <Form.Control required placeholder="nombre ...." />
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Apellidos *</Form.Label>
                <Form.Control required placeholder="Apellidos ....." />
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio.
                </Form.Control.Feedback>
              </Form.Group>

              <h6 className="mt-4">¿Cuál es tu Rut?</h6>

              <Form.Group className="mb-3">
                <Form.Label>RUT *</Form.Label>
                <Form.Control required placeholder="11.222.333-4" />
                <Form.Control.Feedback type="invalid">
                  Ingresa tu RUT.
                </Form.Control.Feedback>
              </Form.Group>

              <div className="alert alert-info py-2">
                Verifica que tu RUT sea el correcto y coincida con tu documento.
              </div>

              <Form.Check
                required
                className="mb-3"
                label={
                  <>
                    Acepto los <a href="#">Términos y Condiciones</a> y la{" "}
                    <a href="#">Política de Privacidad</a>.
                  </>
                }
                feedback="Debes aceptar antes de continuar."
                feedbackType="invalid"
              />

              <Button className="w-100" type="submit" variant="primary">
                Continuar con el pago
              </Button>
            </Form>

            {showSuccess && (
              <Alert variant="success" className="mt-3 text-center">
                ✔ Datos ingresados correctamente. Redirigiendo…
              </Alert>
            )}
          </div>
        </Col >
        <Col md={4}>
           <div className="p-3 border rounded bg-white shadow-sm">
             <h5 className="mb-3">Resumen de Compra</h5>
            {cart.length === 0 ? (
            <p className="text-muted">No hay productos en el carrito.</p>
            ) : (

            <>

            {cart.map((item) => (
            <div key={item.carta.id} className="d-flex align-items-center mb-3">
            <img src={item.carta.img} width="55" height="55" className="me-3 rounded"/>

            <div className="flex-grow-1">
              <p className="m-0 fw-semibold">{item.carta.nombre}</p>
              <small className="text-muted">
                {item.cantidad} × ${item.carta.precio}
              </small>
            </div>

            <strong>${item.carta.precio * item.cantidad}</strong>
          </div>
        ))}

        <hr />

        <p className="d-flex justify-content-between">
          <span className="fw-semibold">Total:</span>
          <strong>${totalAmount}</strong>
        </p>
      </>
    )}

  </div>
</Col>

      </Row>
    </Container>
  );
};