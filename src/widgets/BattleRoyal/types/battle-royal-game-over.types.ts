export interface BattleRoyalGameResult {
  id: string;
  roomId: string;
  createdAt: Date;
  updatedAt: Date;
  winnerId: string;
}

export interface GameResultSummary {
  gameResult: BattleRoyalGameResult;
  winner: {
    id: string;
    displayName: string;
    picture?: string;
    rating: number;
  };
  room: {
    id: string;
    turnNumber: number;
    fieldSize: number;
    createdAt: Date;
    finishedAt: Date;
  };
  players: Array<{
    id: string;
    displayName: string;
    picture?: string;
    rating: number;
    ratingChange: number;
    kills: number;
    damageDealt: number;
    distanceTraveled: number;
    eliminationOrder: number;
    isWinner: boolean;
  }>;
  totalPlayers: number;
}
