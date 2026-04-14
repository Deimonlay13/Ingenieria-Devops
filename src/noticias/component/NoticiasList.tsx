import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import type { Noticia } from "../interface/noticia.interface";
import "./noticias.css";

interface Props {
  noticias: Noticia[];
}

export const NoticiasList: React.FC<Props> = ({ noticias }) => {
  return (
    <section className="noticias-container">
      <h2 className="section-title">Noticias</h2>
      {noticias.map((noticia) => (
        <a
          key={noticia.id}
          href={noticia.url}
          target="_blank"
          rel="noopener noreferrer"
          className="news-link text-decoration-none"
        >
          <Card className="news-card mb-4 shadow-sm border-secondary" data-bs-theme="dark">
            <Row className="g-0 news-row">
              <Col xs={12} md={4} className="news-image-col">
                <Card.Img
                  src={noticia.imagen}
                  alt={noticia.titulo}
                  className="news-card-img"
                />
              </Col>
              <Col xs={12} md={8}>
                <Card.Body className="news-card-body">
                  <Card.Text className="news-date mb-1">{noticia.fecha}</Card.Text>
                  <Card.Title className="news-title">{noticia.titulo}</Card.Title>
                  <Card.Text className="news-description mb-0">
                    {noticia.descripcion}
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </a>
      ))}
    </section>
  );
};
