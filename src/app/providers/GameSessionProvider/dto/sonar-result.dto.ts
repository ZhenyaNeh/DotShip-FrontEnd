import { MoveType } from '@/src/shared/lib/types';

export interface SonarResultDto {
  userId: string;
  cells: MoveType[];
}
