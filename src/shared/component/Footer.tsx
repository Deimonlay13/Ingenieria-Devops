import { Container, Row, Col, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="app-footer text-light py-4 mt-auto">
      <Container>
        <Row className="align-items-center">

          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <h5 className="fw-bold">PokecardStore</h5>
            <p className="mb-0">
              &copy; {new Date().getFullYear()} PokecardStore. Todos los
              derechos reservados.
            </p>
          </Col>


          <Col md={4} className="text-center mb-3 mb-md-0">
            <Nav className="justify-content-center">
              <Nav.Link as={NavLink} to="/cartas" className="text-light">
                Cartas
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contacto" className="text-light">
                Contacto
              </Nav.Link>
            </Nav>
          </Col>

          <Col md={4} className="text-center text-md-end">
            <a
              href="https://twitter.com"
              className="text-light mx-2"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://facebook.com"
              className="text-light mx-2"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              className="text-light mx-2"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
