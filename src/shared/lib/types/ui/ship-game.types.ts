import { MoveResult } from '@/src/widgets/GameSession/types/initial-game-state.types';

export interface ShipType {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  health: number;
}

export interface MoveType {
  x: number;
  y: number;
  result: MoveResult;
}

export interface UserType {
  id: string;
  email: string;
  displayName: string;
  picture?: string;
  rating?: number;
}

export interface ShipCordType {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Cell {
  x: number;
  y: number;
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
