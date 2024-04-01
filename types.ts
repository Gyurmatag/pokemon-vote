export type Form = {
  name: string;
};

export type Move = {
  id: number;
  name: string;
  pokemonId: number;
};

export type Stat = {
  stat: {
    name: string;
  };
  base_stat: number;
};
