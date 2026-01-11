export const GAME_MODES = {
  CLASSIC: {
    label: 'Classic',
    description: 'Classic version of the game',
    color: 'bg-blue-500',
  },
  EVENTS: {
    label: 'With events',
    description: 'Dynamic version with random events',
    color: 'bg-purple-500',
  },
  BATTLE_ROYAL: {
    label: 'Battle Royal',
    description: 'Multiplayer battle',
    color: 'bg-red-500',
  },
} as const;
