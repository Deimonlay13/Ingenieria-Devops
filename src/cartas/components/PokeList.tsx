import { useRef, useState, type ChangeEvent, type FC, type MouseEvent } from "react";
import type { CartaPokemon } from "../interfaces/carta-pokemon.interface";
import { Counter } from "../../counter/Counter";
import "./pokeList.css"
interface Props {
  cartas: CartaPokemon[];
  cartaDestacada?: CartaPokemon;
  loading?: boolean;
  filtros?: {
    filtroTexto: string;
    filtroTipo: string;
    ordenPrecio: string;
    tiposDisponibles: string[];
    total: number;
  };
  onTextoChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onTipoChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  onOrdenChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const PokeList: FC<Props> = ({
  cartas,
  cartaDestacada,
  loading = false,
  filtros = {
    filtroTexto: "",
    filtroTipo: "todos",
    ordenPrecio: "ninguno",
    tiposDisponibles: [],
    total: cartas.length,
  },
  onTextoChange = () => undefined,
  onTipoChange = () => undefined,
  onOrdenChange = () => undefined,
}) => {
  const HERO_FEATURED_IMG =
    "https://dz3we2x72f7ol.cloudfront.net/expansions/perfect-order/en-us/P614_EN_62-2x.png";
  const HERO_FEATURED_BACK = "https://images.pokemontcg.io/cardback.png";
  const heroCardRef = useRef<HTMLDivElement | null>(null);
  const [heroTransform, setHeroTransform] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  );
  const [heroShine, setHeroShine] = useState(
    "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 14%, rgba(255,255,255,0) 70%)"
  );

  const handleHeroMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!heroCardRef.current) return;
    const rect = heroCardRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 18;
    const rotateX = (0.5 - y) * 16;

    setHeroTransform(
      `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
    );

    const angle = Math.atan2(y - 0.5, x - 0.5);
    setHeroShine(
      `linear-gradient(${angle}rad, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.16) 8%, rgba(255,255,255,0.02) 36%, rgba(255,255,255,0) 78%)`
    );
  };

  const handleHeroMouseLeave = () => {
    setHeroTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setHeroShine(
      "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 14%, rgba(255,255,255,0) 70%)"
    );
  };

  const handleExplorar = () => {
    const section = document.getElementById("cards-filtros");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleVerCarrito = () => {
    const cartButton = document.querySelector(".btn-cart") as HTMLButtonElement | null;
    cartButton?.click();
  };

  return (
    <div className="container pb-5">
      <section className="hero-cards mt-4 mb-5">
        <div className="hero-overlay"></div>
        <div className="row align-items-center g-4 position-relative">
          <div className="col-12 col-lg-7">
            <p className="hero-kicker mb-2">Pokemon TCG Store</p>
            <h1 className="hero-title mb-3">Descubre nuestra colección Pokemon</h1>
            <p className="hero-subtitle mb-4">
              Explora cartas reales, encuentra tus favoritas y arma tu mazo ideal con una experiencia de compra
              rapida y moderna.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <button type="button" className="btn btn-gaming hero-btn" onClick={handleExplorar}>
                Explorar cartas
              </button>
              <button type="button" className="btn btn-outline-light hero-btn-secondary" onClick={handleVerCarrito}>
                Ver carrito
              </button>
            </div>
          </div>

          <div className="col-12 col-lg-5 d-flex justify-content-center justify-content-lg-end">
            <div className="hero-featured-card">
              <div
                ref={heroCardRef}
                className="card__img-wrapper perspective-card__transformer"
                style={{ transform: heroTransform }}
                onMouseMove={handleHeroMouseMove}
                onMouseLeave={handleHeroMouseLeave}
              >
                <div className="card__img card__img--front">
                  <img src={HERO_FEATURED_IMG} alt="Meowth ex" />
                </div>
                <div className="card__img card__img--back">
                  <img alt="Card back" src={HERO_FEATURED_BACK} />
                </div>
                <div className="card__shine perspective-card__shine" style={{ background: heroShine }}></div>
              </div>
              <div className="hero-featured-info">
                <span className="hero-featured-type">{cartaDestacada?.tipo || "Pokemon ex"}</span>
                <h3 className="mb-1">Meowth ex</h3>
                <small>Carta destacada del hero</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="cards-filtros" className="text-center my-4 title-container">
        <h2 className="section-title">Explora nuestras cartas</h2>
      </div>
      <div className="card p-3 mb-4 card-translucent">
        <div className="row g-2 align-items-end">
          <div className="col-12 col-md-5">
            <label className="form-label mb-1">Buscar carta</label>
            <input
              className="form-control"
              placeholder="Ej: pikachu, charizard..."
              value={filtros.filtroTexto}
              onChange={onTextoChange}
            />
          </div>
          <div className="col-6 col-md-3">
            <label className="form-label mb-1">Tipo</label>
            <select className="form-select" value={filtros.filtroTipo} onChange={onTipoChange}>
              <option value="todos">Todos</option>
              {filtros.tiposDisponibles.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6 col-md-3">
            <label className="form-label mb-1">Orden precio</label>
            <select className="form-select" value={filtros.ordenPrecio} onChange={onOrdenChange}>
              <option value="ninguno">Sin orden</option>
              <option value="asc">Menor a mayor</option>
              <option value="desc">Mayor a menor</option>
            </select>
          </div>
          <div className="col-12 col-md-1 d-flex align-items-center justify-content-md-end">
            <span className="badge text-bg-primary">{filtros.total}</span>
          </div>
        </div>
      </div>
      {loading && <p className="text-center fw-semibold">Cargando cartas desde TCGdex...</p>}
      {!loading && cartas.length === 0 && (
        <p className="text-center fw-semibold">No hay cartas para ese filtro.</p>
      )}
      <div className="row g-3 ">
        {cartas.map((carta) => (
          <div key={carta.id} className="col-12 col-sm-6 col-md-3 col-lg-3">
            <div className="card h-100 text-center card-translucent card-pokemon">
              <div className="card-image-wrap">
                {carta.tipo && <span className="badge rounded-pill text-bg-dark badge-tipo">{carta.tipo}</span>}
                <img
                  src={carta.img}
                  className="card-img-top"
                  alt={carta.nombre}
                  loading="lazy"
                />
              </div>
              <div className="card-body p-3 d-flex flex-column">
                <h5 className="card-title card-title-fixed">{carta.nombre}</h5>
                <div className="card-meta mb-3">
                  <p className="card-text mb-1"><strong>Precio:</strong> ${carta.precio}</p>
                  <p className="card-text mb-0"><strong>Stock:</strong> {carta.stock}</p>
                </div>
                <Counter carta={carta} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
