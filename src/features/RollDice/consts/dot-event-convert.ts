import { GameEvents } from '@/src/shared/lib/types';

export const dotEventConvert: Record<number, GameEvents> = {
  1: GameEvents.NO_EVENT,
  2: GameEvents.BROKEN_WEAPON,
  3: GameEvents.MINE,
  4: GameEvents.ROCKET,
  5: GameEvents.SONAR,
  6: GameEvents.STORM,
};
