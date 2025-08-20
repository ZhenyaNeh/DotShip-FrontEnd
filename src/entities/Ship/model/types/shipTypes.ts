export interface ShipCordType {
  x: number; // Позиция по оси X
  y: number; // Позиция по оси Y
  w: number; // Ширина корабля
  h: number; // Высота корабля
}

export interface ShipType {
  id: number; // Уникальный идентификатор корабля
  cords: ShipCordType; // Координаты корабля
  health: number; // Здоровье корабля (не используется в данном коде)
}

export interface Cell {
  x: number;
  y: number;
}

export interface HitType {
  cell: Cell;
  hit: boolean; // попадание (да/нет)
}

export enum ShipComponentTypes {
  PLACEMENT = 'placement',
  GAME = 'game',
}

export type VariantType =
  | 'ship_4_hor'
  | 'ship_4_vert'
  | 'ship_3_hor'
  | 'ship_3_vert'
  | 'ship_2_hor'
  | 'ship_2_vert'
  | 'ship_1_hor'
  | 'ship_1_vert';
