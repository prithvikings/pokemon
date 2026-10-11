export const COLORS = {
  background: "#18181b",
  card: "#27272a",
  text: "#fafafa",
  subtext: "#a1a1a1",
  border: "#3f3f46",
  accentYellow: "#facc15",
  accentEmerald: "#34d399",

  normal: "#A8a77a",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export type ColorPalette = typeof COLORS;
export type ColorKey = keyof ColorPalette;
