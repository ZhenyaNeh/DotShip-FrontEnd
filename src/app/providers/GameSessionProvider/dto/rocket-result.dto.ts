import { MoveType, ShipType } from '@/src/shared/lib/types';

export interface RocketResultDto {
  userId?: string;
  opponentId?: string;
  moves: MoveType[];
  ships: ShipType[];
}
