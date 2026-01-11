import { GameMode } from '@/src/shared/lib/types';

export enum MoveResult {
  HIT = 'HIT',
  MISS = 'MISS',
  SUNK = 'SUNK',
}

export enum RoomPrivacy {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export interface PlayerGameState {
  user: {
    id: string;
    email: string;
    displayName: string;
    picture?: string;
    rating?: number;
  };
  ships: Array<{
    id: number;
    x: number;
    y: number;
    w: number;
    h: number;
    health: number;
  }>;
  moves: Array<{
    x: number;
    y: number;
    result: MoveResult;
  }>;
  ratingHistory?: {
    oldRating: number;
    newRating: number;
    ratingChange: number;
  };
}

export interface InitialGameState {
  player_user: PlayerGameState;
  player_opponent: PlayerGameState;
  playerTurn: string;
  winner_id?: string;
  room: {
    id: string;
    privacy: RoomPrivacy;
    gameMode: GameMode;
  };
}
