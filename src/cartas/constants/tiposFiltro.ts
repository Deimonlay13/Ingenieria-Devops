/**
 * Tipos alineados con la API TCGdex (inglés) + etiquetas en español para el filtro.
 * Iconos: Bootstrap Icons (clase sin prefijo `bi-` en `icon`).
 */
export type TipoFiltroMeta = {
  value: string;
  labelEs: string;
  icon: string;
};

export const TIPOS_FILTRO: TipoFiltroMeta[] = [
  { value: "Grass", labelEs: "Planta", icon: "flower1" },
  { value: "Fire", labelEs: "Fuego", icon: "fire" },
  { value: "Water", labelEs: "Agua", icon: "droplet" },
  { value: "Lightning", labelEs: "Rayo", icon: "lightning-charge-fill" },
  { value: "Psychic", labelEs: "Psíquico", icon: "stars" },
  { value: "Fighting", labelEs: "Lucha", icon: "hammer" },
  { value: "Darkness", labelEs: "Oscuridad", icon: "moon-stars-fill" },
  { value: "Metal", labelEs: "Metal", icon: "shield-fill" },
  { value: "Dragon", labelEs: "Dragón", icon: "hexagon-fill" },
  { value: "Fairy", labelEs: "Hada", icon: "heart-fill" },
  { value: "Colorless", labelEs: "Incoloro", icon: "circle" },
  { value: "Ice", labelEs: "Hielo", icon: "snow" },
  { value: "Ground", labelEs: "Tierra", icon: "globe-americas" },
  { value: "Rock", labelEs: "Roca", icon: "pentagon" },
  { value: "Bug", labelEs: "Bicho", icon: "bug" },
  { value: "Ghost", labelEs: "Fantasma", icon: "ghost" },
  { value: "Flying", labelEs: "Volador", icon: "wind" },
  { value: "Poison", labelEs: "Veneno", icon: "droplet-half" },
  { value: "Electric", labelEs: "Eléctrico", icon: "lightning-fill" },
  { value: "Normal", labelEs: "Normal", icon: "record-circle" },
  { value: "Pokemon", labelEs: "Pokémon", icon: "patch-question" },
];

const orden = new Map(TIPOS_FILTRO.map((t, i) => [t.value, i]));

/** Metadatos por valor exacto de API */
export function metaTipo(value: string): TipoFiltroMeta {
  const found = TIPOS_FILTRO.find((t) => t.value === value);
  if (found) return found;
  return {
    value,
    labelEs: value,
    icon: "tag",
  };
}

/**
 * Lista para el filtro: todos los tipos conocidos + cualquier tipo extra que venga en las cartas cargadas.
 */
export function mergeTiposFiltro(tiposEnCartas: string[]): string[] {
  const extras = tiposEnCartas.filter((t) => t && !orden.has(t));
  const base = TIPOS_FILTRO.map((t) => t.value);
  return [...base, ...extras.sort((a, b) => a.localeCompare(b))];
}
