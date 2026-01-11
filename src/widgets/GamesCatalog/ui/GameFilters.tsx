'use client';

import { FC } from 'react';

import { cn } from '@/src/shared/lib/clsx';
import { IGame } from '@/src/shared/lib/types';
import { GAME_MODES } from '@/src/shared/lib/utils';
import { Button } from '@/src/shared/ui/Button/Button';

interface GameFiltersProps {
  selectedMode: IGame['gameMode'] | 'ALL';
  onModeChange: (mode: IGame['gameMode'] | 'ALL') => void;
}

export const GameFilters: FC<GameFiltersProps> = ({
  selectedMode,
  onModeChange,
}) => {
  const filters = [
    { value: 'ALL' as const, label: 'All games' },
    ...Object.entries(GAME_MODES).map(([key, value]) => ({
      value: key as IGame['gameMode'],
      label: value.label,
    })),
  ];

  return (
    <div className='flex flex-wrap gap-2'>
      {filters.map(filter => (
        <Button
          key={filter.value}
          variant={selectedMode === filter.value ? 'default' : 'outline'}
          size='sm'
          onClick={() => onModeChange(filter.value)}
          className={cn(
            'transition-all',
            selectedMode === filter.value && 'shadow-md'
          )}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};
