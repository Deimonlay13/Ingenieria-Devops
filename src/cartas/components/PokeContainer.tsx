import { useEffect, useMemo, useState, type ChangeEvent, type FC } from "react";
import type { CartaPokemon } from "../interfaces/carta-pokemon.interface";
import { PokeList } from "./PokeList";
import { buscarCartas, obtenerCartas } from "../../services/tcgService";

export const PokeContainer: FC = () => {
  const [cards, setCards] = useState<CartaPokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [ordenPrecio, setOrdenPrecio] = useState("ninguno");

  useEffect(() => {
    let active = true;
    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        const result = filtroTexto.trim()
          ? await buscarCartas(filtroTexto)
          : await obtenerCartas();
        if (active) setCards(result);
      } catch (err) {
        console.error("Error cargando cartas de TCGdex:", err);
      } finally {
        if (active) setLoading(false);
      }
    }, 350);

    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, [filtroTexto]);

  const tiposDisponibles = useMemo(() => {
    return [...new Set(cards.map((card) => card.tipo).filter((tipo): tipo is string => Boolean(tipo)))].sort();
  }, [cards]);

  const cartasFiltradas = useMemo(() => {
    const filtered = cards.filter((card) => {
      const matchesTipo = filtroTipo === "todos" || card.tipo === filtroTipo;
      return matchesTipo;
    });

    if (ordenPrecio === "asc") {
      return [...filtered].sort((a, b) => a.precio - b.precio);
    }
    if (ordenPrecio === "desc") {
      return [...filtered].sort((a, b) => b.precio - a.precio);
    }
    return filtered;
  }, [cards, filtroTexto, filtroTipo, ordenPrecio]);

  const onTextoChange = (e: ChangeEvent<HTMLInputElement>) => setFiltroTexto(e.target.value);
  const onTipoChange = (e: ChangeEvent<HTMLSelectElement>) => setFiltroTipo(e.target.value);
  const onOrdenChange = (e: ChangeEvent<HTMLSelectElement>) => setOrdenPrecio(e.target.value);

  return (
    <PokeList
      cartas={cartasFiltradas}
      loading={loading}
      filtros={{
        filtroTexto,
        filtroTipo,
        ordenPrecio,
        tiposDisponibles,
        total: cartasFiltradas.length,
      }}
      onTextoChange={onTextoChange}
      onTipoChange={onTipoChange}
      onOrdenChange={onOrdenChange}
    />
  );
};
