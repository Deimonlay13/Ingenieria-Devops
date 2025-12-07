import type { FC } from "react";
import type { CartaPokemon } from "../interfaces/carta-pokemon.interface";
import { Counter } from "../../counter/Counter";
import "./pokeList.css"
interface Props {
  cartas: CartaPokemon[];
}

export const PokeList: FC<Props> = ({ cartas }) => {
  return (
    <div className="container  pb-5">
      <div className="text-center my-4 title-container">
        <h1 className="section-title">Descubre nuestra colección Pokémon</h1>
      </div>
      <div className="row g-3 ">
        {cartas.map((carta) => (
          <div key={carta.id} className="col-12 col-sm-6 col-md-3 col-lg-3">
            <div className="card h-100 text-center card-translucent">
              <img
                src={carta.img}
                className="card-img-top"
                alt={carta.nombre}
              />
              <div className="card-body p-2">
                <h5 className="card-title">{carta.nombre}</h5>
                <p className="card-text">Precio: ${carta.precio}</p>
                <p className="card-text">Stock: {carta.stock}</p>
                <Counter carta={carta} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
