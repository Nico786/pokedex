// Type definition file
// export type Color = 'red' | 'blue' | 'green';

// Will be exported as: 
// import { type Color } from '@/lib/type';
// type ButtonProps = {
//   color: Color;
// };

export type Pokemon = {
  id: number;
  name: string;
  level?: number;
  weight: string;
  sprites: Sprite[];
  types: Type[];
  stats: Stat[];
};

type Sprite = {
  id: number;
  url: string;
};

type Type = {
  id: number;
  name: string;
};

type Stat = {
  id: number;
  atk: number;
  def: number;
  vit: number;
};
