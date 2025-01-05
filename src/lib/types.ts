// Type definition file
// export type Color = 'red' | 'blue' | 'green';

// Will be exported as: 
// import { type Color } from '@/lib/type';
// type ButtonProps = {
//   color: Color;
// };

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
