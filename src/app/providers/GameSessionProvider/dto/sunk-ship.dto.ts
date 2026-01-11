import { MoveType, ShipType } from '@/src/shared/lib/types';

export interface SunkShipDto {
  userId: string;
  moves: MoveType[];
  ship: ShipType;
}
