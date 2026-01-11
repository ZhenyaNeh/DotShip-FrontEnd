import { IUser } from '@/src/features/Auth/types';

export enum BattleRoyalRoomStatus {
  WAITING = 'WAITING',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED',
}

export enum BattleRoyalUpgradeType {
  EXTRA_LIFE = 'EXTRA_LIFE',
  MOVEMENT_BOOST = 'MOVEMENT_BOOST',
  ATTACK_BOOST = 'ATTACK_BOOST',
  VISION_BOOST = 'VISION_BOOST',
}

export interface BattleRoyalGameData {
  room: {
    id: string;
    status: BattleRoyalRoomStatus;
    turnNumber: number;
    fieldSize: number;
    playerTurn: string;
    safeZoneRadius: number;
    nextShrinkTurn: number;
    isMyTurn: boolean;
  };
  myPlayer: {
    id: string;
    user: IUser;
    x: number;
    y: number;
    lives: number;
    maxLives: number;
    remainingMoves: number;
    remainingAttacks: number;
    movementBoost: number;
    attackBoost: number;
    visionRadius: number;
    upgradeSlots: Array<{
      slotIndex: number;
      upgradeType: BattleRoyalUpgradeType;
    }>;
    visibleCells: Array<{ x: number; y: number }>;
  };
  otherPlayers: Array<{
    id: string;
    user: IUser;
    x: number;
    y: number;
    lives: number;
    isAlive: boolean;
  }>;
  upgrades: Array<{
    id: string;
    x: number;
    y: number;
    upgradeType: BattleRoyalUpgradeType;
    isCollected: boolean;
  }>;
  visibleUpgrades: Array<{
    id: string;
    x: number;
    y: number;
    upgradeType: BattleRoyalUpgradeType;
    isCollected: boolean;
  }>;
}
