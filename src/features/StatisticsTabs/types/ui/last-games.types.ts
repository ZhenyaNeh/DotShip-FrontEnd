import { GameMode } from '@/src/shared/lib/types';

export enum LastGamesResult {
  WIN = 'WIN',
  LOSS = 'LOSS',
  IN_PROGRESS = 'IN_PROGRESS',
}

export interface LastGames {
  classic: {
    roomId: string;
    gameName: string;
    gamePicture: string;
    date: Date;
    gameMode: GameMode;
    result: LastGamesResult;
  }[];
  battleRoyal: {
    roomId: string;
    gameName: string;
    gamePicture: string;
    date: Date;
    isAlive: boolean;
    kills: number;
    result: LastGamesResult;
  }[];
}
