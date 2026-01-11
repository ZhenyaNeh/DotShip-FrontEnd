import { GameMode } from '@/src/shared/lib/types';

export const gameModes = [
  { id: 'all', label: 'All mode' },
  { id: GameMode.CLASSIC, label: 'Classic' },
  { id: GameMode.EVENTS, label: 'With events' },
  { id: GameMode.BATTLE_ROYAL, label: 'Battle royal' },
];
