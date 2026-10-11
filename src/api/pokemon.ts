export interface PokemonRef {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonRef[];
}

export interface PokemonTypeEntry {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStats {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonDetail {
  id: number;
  name: string;
  types: PokemonTypeEntry[];
  stats: PokemonStats[];
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  weight: number;
  height: number;
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemonList = async (
  limit: number = 20,
  offset: number = 0,
): Promise<PokemonListResponse> => {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon list");
  }

  return response.json();
};

export const getPokemonDetail = async (
  nameorid: string | number,
): Promise<PokemonDetail> => {
  const response = await fetch(`${BASE_URL}/pokemon/${nameorid}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon details for ${nameorid}`);
  }
  return response.json();
};

export const getPokemonByType = async (type: string): Promise<PokemonRef[]> => {
  const response = await fetch(`${BASE_URL}/type/${type}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon by type ${type}`);
  }
  const data = await response.json();
  return data.pokemon.map((item: any) => item.pokemon);
};
