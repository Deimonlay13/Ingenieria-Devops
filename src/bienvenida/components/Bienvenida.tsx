import React from "react";
import "./Bienvenida.css";

import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';

const Bienvenida: React.FC = () => {
    return (
        <>
            <main className="home-page">
                {/* HERO */}
                <Carousel className="hero-carousel">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://www.cashconverters.es/es/es/oportunidades/wp-content/uploads/2025/06/05_img_juegos_pokemon.jpg"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://www.pokelite.fr/wp-content/uploads/2025/07/Gvf6MxSWcAADrs2-1024x576.webp"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://pokemonalpha.es/wp-content/uploads/2025/01/escarlata-purpura-tcg-portada-juntos-de-aventuras.jpg"
                            alt="First slide"
                        />
                    </Carousel.Item>
                </Carousel>

                {/* TITULO */}
                <section className="seccion-intro text-center">
                    <h2 className="section-title">Explora el mundo del TCG</h2>
                    <p className="seccion-descripcion">
                        Aquí encontrarás recursos clave para aprender a jugar, conocer los mazos más competitivos y construir tu propia estrategia.
                    </p>
                </section>


                {/* CARDS */}
                <div className="cartas-flex">
                    <Card className="carta">
                        <Card.Img
                            variant="top"
                            src="https://tcgplayer-cdn.tcgplayer.com/product/488081_in_1000x1000.jpg"
                            alt="Carta Pokémon"
                        />
                        <Card.Body>
                            <Card.Title>REGLAS DEL JUEGO</Card.Title>
                            <Card.Text>
                                En esta sección podrás actualizarte sobre las reglas del juego.
                            </Card.Text>
                            <a
                                href="https://www.pokemon.com/static-assets/content-assets/cms2-es-es/pdf/trading-card-game/rulebook/twm_rulebook_es.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-gaming"
                            >
                                Ver más
                            </a>

                        </Card.Body>
                    </Card>

                    <Card className="carta">
                        <Card.Img
                            variant="top"
                            src="https://www.pokemon.com/static-assets/content-assets/cms2/img/cards/full/SV10/SV10_EN_238.png"
                            alt="Carta Pokémon"
                        />
                        <Card.Body>
                            <Card.Title>MAZOS META</Card.Title>
                            <Card.Text>
                                Explora los mazos más populares y competitivos.
                            </Card.Text>
                            <a
                                href="https://pokemoncard.io/category/tournament-decks/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-gaming"
                            >
                                Ver más
                            </a>
                        </Card.Body>
                    </Card>

                    <Card className="carta">
                        <Card.Img
                            variant="top"
                            src="https://www.oasisgames.cl/cdn/shop/files/b1d2cffe-ac06-5ef4-8642-4211858c1480_800x.jpg?v=1755121236"
                            alt="Carta Pokémon"
                        />
                        <Card.Body>
                            <Card.Title>ARMA TU MAZO</Card.Title>
                            <Card.Text>
                                Diseña tu estrategia y construye el mazo ideal.
                            </Card.Text>
                            <a
                                href="https://www.pokemon.com/el/estrategia/consejos-para-disenar-una-baraja-desde-el-principio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-gaming"
                            >
                                Ver más
                            </a>
                        </Card.Body>
                    </Card>
                </div>


            </main>
        </>
    );
};

export default Bienvenida;
