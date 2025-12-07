import { useEffect, useState, type FC } from "react";
import type { CartaPokemon } from "../interfaces/carta-pokemon.interface";
import { PokeList } from "./PokeList";

export const PokeContainer: FC = () => {
  const [cards, setCards] = useState<CartaPokemon[]>([]);

useEffect(() => {
  fetch("http://localhost:8080/Producto/")
    .then(res => res.json())
    .then(data => setCards(data))
    .catch(err => console.error("Error cargando cartas", err));
}, []);



  return <PokeList cartas={cards} />;
};
