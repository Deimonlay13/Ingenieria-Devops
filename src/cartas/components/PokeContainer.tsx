import { useEffect, useState, type FC } from "react";
import type { CartaPokemon } from "../interfaces/carta-pokemon.interface";
import { PokeList } from "./PokeList";
import { mockCartas } from "../mock/cartas.mock";

export const PokeContainer: FC = () => {
  const [cards, setCards] = useState<CartaPokemon[]>([]);

useEffect(() => {
  fetch("http://localhost:8080/Producto/")
    .then(res => res.json())
    .then(data => setCards(data))
    .catch(err => {
      console.error("Error cargando cartas, usando mock local:", err);
      setCards(mockCartas);
    });
}, []);



  return <PokeList cartas={cards} />;
};
