import {
  Navbar,
  Nav,
  Container,
  Offcanvas,
  Dropdown,
  Modal,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../cartas/context/CartContext";
import { useState, useEffect } from "react";
import { CartDetails } from "../../cartas/components/CartDetails";
import "../../App.css";

const Header = () => {
  const navigate = useNavigate();
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

  const iniciales = user
    ? `${user.nombre[0] ?? ""}${user.apellido[0] ?? ""}`.toUpperCase()
    : "";

  return (
    <Navbar
      className="app-header app-navbar"
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      collapseOnSelect
    >
      <Container fluid="xxl" className="header-nav-container px-3 px-lg-4">
        <Navbar.Brand as={NavLink} to="/" className="navbar-brand-logo py-0 me-0 me-lg-3">
          <img
            className="navbar-logo-img"
            src="https://tcg.pokemon.com/assets/img/global/logos/en-us/tcg-logo.png"
            alt="Pokémon Trading Card Game"
            loading="eager"
            decoding="async"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-collapse" className="border-secondary" />

        <Navbar.Collapse id="main-navbar-collapse" className="header-navbar-collapse align-items-lg-center">
          <Nav className="nav-tcg-main mx-lg-auto my-3 my-lg-0">
            <Nav.Link
              as={NavLink}
              to="/"
              end
              className="nav-tcg-link d-inline-flex align-items-center gap-2"
            >
              <i className="bi bi-house-door-fill nav-tcg-link__icon" aria-hidden />
              Inicio
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/cartas"
              className="nav-tcg-link d-inline-flex align-items-center gap-2"
            >
              <i className="bi bi-layers-fill nav-tcg-link__icon" aria-hidden />
              Cartas
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/noticias"
              className="nav-tcg-link d-inline-flex align-items-center gap-2"
            >
              <i className="bi bi-newspaper nav-tcg-link__icon" aria-hidden />
              Noticias
            </Nav.Link>
            {!user && (
              <Nav.Link
                as={NavLink}
                to="/login"
                className="nav-tcg-link nav-tcg-link--secondary d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-box-arrow-in-right nav-tcg-link__icon" aria-hidden />
                Iniciar sesión
              </Nav.Link>
            )}
          </Nav>

          <div className="header-toolbar d-flex align-items-center justify-content-lg-end flex-wrap gap-4 py-3 py-lg-0 mt-2 mt-lg-0">
            <button
              type="button"
              className="btn btn-cart position-relative"
              onClick={() => setShowCart(!showCart)}
            >
              <i className="bi bi-cart3 me-2" aria-hidden />
              Carrito
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              )}
            </button>

            {user && (
              <Dropdown align="end" className="header-profile-dropdown">
                <Dropdown.Toggle
                  variant="dark"
                  id="dropdown-user"
                  className="header-profile-toggle rounded-circle"
                >
                  <span className="header-profile-initials">{iniciales}</span>
                  <i className="bi bi-chevron-down header-profile-caret" aria-hidden />
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark" className="header-profile-menu">
                  <Dropdown.Item disabled className="text-white-50">
                    Hola, {user.nombre} {user.apellido}
                  </Dropdown.Item>

                  <Dropdown.Divider className="border-secondary" />

                  <Dropdown.Item as={NavLink} to="/perfil">
                    Mi perfil
                  </Dropdown.Item>

                  <Dropdown.Item as={NavLink} to="/compras">
                    Mis compras
                  </Dropdown.Item>

                  <Dropdown.Divider className="border-secondary" />

                  <Dropdown.Item onClick={logout}>Cerrar sesión</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </Navbar.Collapse>
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
