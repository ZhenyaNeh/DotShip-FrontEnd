import { MoveType, ShipType } from '@/src/shared/lib/types';

export interface StormResultDto {
  userId?: string;
  opponentId?: string;
  newUserShips: ShipType[];
  newOpponentMoves: MoveType[];
}
