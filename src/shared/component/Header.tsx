import {
  Navbar,
  Nav,
  Container,
  Offcanvas,
  Figure,
  Dropdown,
  Modal,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../cartas/context/CartContext";
import { useState, useEffect } from "react";
import { CartDetails } from "../../cartas/components/CartDetails";
import "../../App.css"

const Header = () => {
  const { totalItems } = useCart();
  const [showCart, setShowCart] = useState(false);
  const handleClose = () => setShowCart(false);

  const [user, setUser] = useState<{ nombre: string; apellido: string } | null>(
    null
  );
  const [showLoginModal, setShowLoginModal] = useState(false);


  const handleForceLogin = () => {
    setShowLoginModal(false);
    navigate("/login");
  };
  
  const navigate = useNavigate();

  const handleComprar = () => {
    setShowCart(false);
    navigate("/comprar");
  };

  // Cargar usuario desde localStorage
  useEffect(() => {
    const nombre = localStorage.getItem("userNombre");
    const apellido = localStorage.getItem("userApellido");

    if (nombre && apellido) {
      setUser({ nombre, apellido });
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userNombre");
    localStorage.removeItem("userApellido");
    setUser(null);
    window.location.href = "/login";
  }

  // Generar iniciales (G B, por ejemplo)
  const iniciales = user
    ? `${user.nombre[0] ?? ""}${user.apellido[0] ?? ""}`.toUpperCase()
    : "";

  return (
    <Navbar className="app-header" bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <Figure className="align-self-end">
            <Figure.Image
              alt="Logo-Pokemon"
              src="https://tcg.pokemon.com/assets/img/global/logos/en-us/tcg-logo.png"
            />
          </Figure>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/cartas">
              Cartas
            </Nav.Link>
            <Nav.Link as={NavLink} to="/noticias">
              Noticias
            </Nav.Link>
            {/* <Nav.Link as={NavLink} to="/contacto">
              Contacto
            </Nav.Link> */}

            {/* SI NO HAY USUARIO → Mostrar botón iniciar sesión */}
            {!user && (
              <Nav.Link as={NavLink} to="/login">
                Iniciar Sesión
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>

        <button
          className="btn btn-outline-primary btn-cart position-relative"
          onClick={() => setShowCart(!showCart)}
        >
          🛒 Carrito
          {totalItems > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {totalItems}
            </span>
          )}
        </button>
        {/* SI HAY USUARIO → Mostrar círculo con iniciales */}
        {user && (
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="light"
              id="dropdown-user"
              className="rounded-circle d-flex justify-content-center align-items-center "
              style={{
                width: "40px",
                height: "40px",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              {iniciales}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item disabled>
                Hola, {user.nombre} {user.apellido}
              </Dropdown.Item>

              <Dropdown.Divider />

              <Dropdown.Item as={NavLink} to="/perfil">
                Mi Perfil
              </Dropdown.Item>

              <Dropdown.Item as={NavLink} to="/compras">
                Mis Compras
              </Dropdown.Item>

              <Dropdown.Divider />

              <Dropdown.Item onClick={logout}>Cerrar Sesión</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Container>

      <Offcanvas
        className="carrito"
        show={showCart}
        placement="end"
        onHide={handleClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Tu carrito 🛒</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CartDetails />
          <button
            className="btn btn-gaming btn-lg w-100 mt-4"
            onClick={() => {
              if (!user) {
                // usuario NO logueado → mostrar modal
                setShowLoginModal(true);
                return;
              }
              handleComprar();
            }}
          >
            Comprar
          </button>
        </Offcanvas.Body>
      </Offcanvas>
      <Modal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Inicia sesión</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Para completar tu compra, primero debes iniciar sesión.
        </Modal.Body>

        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setShowLoginModal(false)}
          >
            Cancelar
          </button>

          <button className="btn btn-primary" onClick={handleForceLogin}>
            Ir al Login
          </button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default Header;
