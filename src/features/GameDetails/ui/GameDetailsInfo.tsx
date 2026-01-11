import { FC } from 'react';

import { cn } from '@/src/shared/lib/clsx';
import { IGame } from '@/src/shared/lib/types';
import { DIFFICULTY, GAME_MODES } from '@/src/shared/lib/utils';
import { Badge } from '@/src/shared/ui/Badge/Badge';
import { Separator } from '@/src/shared/ui/Separator/Separator';

interface Props {
  game: IGame;
}

export const GameDetailsInfo: FC<Props> = ({ game }) => {
  const gameModeInfo = GAME_MODES[game.gameMode];
  const difficultyInfo = DIFFICULTY[game.difficulty];

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='mb-4 text-xl font-semibold'>Game details</h3>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div className='bg-card space-y-4 rounded-lg border p-5'>
          <h4 className='font-semibold'>Main Features</h4>
          <div className='space-y-3'>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Game mode</span>
              <span className='font-medium'>{gameModeInfo.label}</span>
            </div>
            <Separator />
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Complexity</span>
              <div className='flex items-center gap-2'>
                <div
                  className={cn(
                    'h-2 w-2 rounded-full',
                    game.difficulty === 'EASY' && 'bg-green-500',
                    game.difficulty === 'MEDIUM' && 'bg-yellow-500',
                    game.difficulty === 'HARD' && 'bg-red-500'
                  )}
                />
                <span className='font-medium'>{difficultyInfo.label}</span>
              </div>
            </div>
            <Separator />
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Status</span>
              <Badge variant={game.isVisible ? 'default' : 'secondary'}>
                {game.isVisible ? 'Активна' : 'Скрыта'}
              </Badge>
            </div>
          </div>
        </div>

        <div className='bg-card space-y-4 rounded-lg border p-5'>
          <h4 className='font-semibold'>Information</h4>
          <div className='space-y-3'>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Game ID</span>
              <code className='bg-muted rounded px-2 py-1 font-mono text-xs'>
                {game.id}
              </code>
            </div>
            <Separator />
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Created</span>
              <span className='font-medium'>
                {new Date(game.createdAt).toLocaleDateString('ru-RU')}
              </span>
            </div>
            <Separator />
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Updated</span>
              <span className='font-medium'>
                {new Date(game.updatedAt).toLocaleDateString('ru-RU')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
