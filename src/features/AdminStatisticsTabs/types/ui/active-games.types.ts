import { GameMode } from '@/src/shared/lib/types';
import { BattleRoyalRoomStatus } from '@/src/widgets/BattleRoyal/types/battle-royal-initial.types';
import { RoomPrivacy } from '@/src/widgets/GameSession/types/initial-game-state.types';

export type GameType = 'CLASSIC' | 'BATTLE_ROYAL';

export interface GamePlayer {
  id: string;
  userId: string;
  roomId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  user: {
    displayName: string;
    picture: string;
  };
}

export interface GameInfo {
  displayName: string;
  gameMode: GameMode;
}

export interface ActiveGame {
  id: string;
  type: GameType;
  gameId: string;
  creatorId: string;
  privacy: RoomPrivacy;
  createdAt: Date | string;
  updatedAt: Date | string;

  game: GameInfo;
  players: GamePlayer[];

  playerTurn?: string;
  roomId?: string;

  status?: BattleRoyalRoomStatus;
}
