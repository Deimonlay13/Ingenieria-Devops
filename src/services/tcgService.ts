import type { CartaPokemon } from "../cartas/interfaces/carta-pokemon.interface";
import { mockCartas } from "../cartas/mock/cartas.mock";

const TCG_API_BASE = "https://api.tcgdex.net/v2/en";
const MAX_CARDS = 32;
const SEARCH_LIMIT = 24;
const SEARCH_CACHE = new Map<string, CartaPokemon[]>();
let cardsCache: CartaPokemon[] | null = null;
const DEFAULT_FALLBACK_IMG = mockCartas[0]?.img || "https://assets.tcgdex.net/en/base/basep/1/high.webp";

type TcgListCard = {
  id: string;
  name: string;
  image?: string;
};

type TcgCardDetail = TcgListCard & {
  types?: string[];
  pricing?: {
    cardmarket?: {
      avg?: number;
    };
  };
};

const toImageUrl = (image?: string) => (image ? `${image}/high.webp` : "");

const buildDefaultPrice = (id: string) => {
  const sum = [...id].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return 8000 + (sum % 120) * 180;
};

const buildDefaultStock = (id: string) => {
  const sum = [...id].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return (sum % 9) + 1;
};

const mapToCarta = (card: TcgCardDetail): CartaPokemon => {
  const img = toImageUrl(card.image) || DEFAULT_FALLBACK_IMG;
  const apiAvgPrice = card.pricing?.cardmarket?.avg;
  const precio = apiAvgPrice ? Math.round(apiAvgPrice * 1000) : buildDefaultPrice(card.id);

  return {
    id: card.id,
    nombre: card.name,
    img,
    tipo: card.types?.[0] || "Pokemon",
    precio,
    stock: buildDefaultStock(card.id),
  };
};

const enrichCardDetail = async (card: TcgListCard): Promise<TcgCardDetail> => {
  try {
    const response = await fetch(`${TCG_API_BASE}/cards/${card.id}`);
    if (!response.ok) return card;
    return (await response.json()) as TcgCardDetail;
  } catch {
    return card;
  }
};

const ensureFixedSize = (cards: CartaPokemon[], size: number): CartaPokemon[] => {
  if (cards.length >= size) return cards.slice(0, size);

  const result = [...cards];
  for (let i = 0; result.length < size; i += 1) {
    const fallback = mockCartas[i % mockCartas.length];
    result.push({
      ...fallback,
      id: `fallback-${result.length + 1}-${fallback.id}`,
    });
  }
  return result;
};

const fetchCardsFromApi = async (url: string, limit: number): Promise<CartaPokemon[]> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("No se pudo consultar TCGdex");

  const data = (await response.json()) as TcgListCard[];
  if (!Array.isArray(data)) throw new Error("Respuesta invalida de TCGdex");

  const baseCards = data.filter((card) => Boolean(card?.id && card?.name)).slice(0, Math.max(limit * 2, limit));
  const detailed = await Promise.all(baseCards.map(enrichCardDetail));
  const mapped = detailed.map(mapToCarta);
  return ensureFixedSize(mapped, limit);
};

export async function obtenerCartas(): Promise<CartaPokemon[]> {
  if (cardsCache) return cardsCache;

  try {
    const cards = await fetchCardsFromApi(`${TCG_API_BASE}/cards`, MAX_CARDS);
    cardsCache = cards.length ? cards : mockCartas;
    return cardsCache;
  } catch (error) {
    console.error("Error obteniendo cartas TCGdex, usando mock local:", error);
    cardsCache = mockCartas;
    return mockCartas;
  }
}

export async function buscarCartas(nombre: string): Promise<CartaPokemon[]> {
  const term = nombre.trim();
  if (!term) return obtenerCartas();

  const cacheKey = term.toLowerCase();
  const cached = SEARCH_CACHE.get(cacheKey);
  if (cached) return cached;

  try {
    const cards = await fetchCardsFromApi(
      `${TCG_API_BASE}/cards?name=${encodeURIComponent(term)}`,
      SEARCH_LIMIT
    );
    const result = cards.length ? cards : mockCartas.filter((card) => card.nombre.toLowerCase().includes(cacheKey));
    SEARCH_CACHE.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error("Error buscando cartas TCGdex, usando mock local:", error);
    return mockCartas.filter((card) => card.nombre.toLowerCase().includes(cacheKey));
  }
}
