import { GameEvents } from '@/src/shared/lib/types';

export const eventDescriptions = {
  [GameEvents.NO_EVENT]: {
    icon: '🎯',
    title: 'Normal shot',
    description: 'Standard mechanics without special effects',
  },
  [GameEvents.BROKEN_WEAPON]: {
    icon: '🔫',
    title: 'Broken Weapon',
    description: '75% chance that the shot will go to a random adjacent cell',
  },
  [GameEvents.MINE]: {
    icon: '💣',
    title: 'Mine',
    description:
      '75% chance that the shot will hit the mine instead of the target',
  },
  [GameEvents.ROCKET]: {
    icon: '🚀',
    title: 'Rocket Strike',
    description:
      'The shot illuminated the target with a cross (center + 4 directions)',
  },
  [GameEvents.SONAR]: {
    icon: '📡',
    title: 'Radar',
    description: 'Emitting ships in a 3x3 zone are highlighted for 3 seconds',
  },
  [GameEvents.STORM]: {
    icon: '🌀',
    title: 'Storm',
    description: 'All misses are cancelled and ships are moved!',
  },
};
