import { ColorKey, COLORS } from "./colors";

export const POKEMON_TPYES = [
  "normal",
  "fighting",
  "flying",
  "fire",
  "water",
  "grass",
  "steel",
  "electric",
  "ground",
  "rock",
  "ice",
  "poison",
  "bug",
  "ghost",
  "psychic",
  "dragon",
  "dark",
  "fairy",
] as const;

export type PokemonType = (typeof POKEMON_TPYES)[number];

export const getTypeColor = (type: string): string => {
  const normalizedType = type.toLowerCase();
  if (normalizedType in COLORS) {
    return COLORS[normalizedType as ColorKey];
  }
  return COLORS.subtext;
};
