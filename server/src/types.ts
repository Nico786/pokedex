// Type definition file

export type Pokemon = {
  pokedex_id: number;
  name: Name;
  level?: number;
  weight: string;
  height: string;
  sprites: Sprite;
  types: Type[];
  stats: Stat;
};

export type Name = {
  fr: string;
};

export type Sprite = {
  regular: string;
  shiny: string;
};

export type Type = {
  name: string;
  image: string;
};

export type Stat = {
  atk: number;
  def: number;
  vit: number;
};
