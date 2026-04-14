import type { ChangeEvent, FC } from "react";
import type { CartaPokemon } from "../interfaces/carta-pokemon.interface";
import { Counter } from "../../counter/Counter";
import "./pokeList.css"
interface Props {
  cartas: CartaPokemon[];
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
  return (
    <div className="container  pb-5">
      <div className="text-center my-4 title-container">
        <h1 className="section-title">Descubre nuestra colección Pokémon</h1>
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
