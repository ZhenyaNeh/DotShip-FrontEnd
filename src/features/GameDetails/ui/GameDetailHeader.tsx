import Image from 'next/image';
import { FC } from 'react';

import { cn } from '@/src/shared/lib/clsx';
import { getImage } from '@/src/shared/lib/get-image';
import { Difficulty, GameMode } from '@/src/shared/lib/types';
import { DIFFICULTY, GAME_MODES } from '@/src/shared/lib/utils';
import { Badge } from '@/src/shared/ui/Badge/Badge';

interface Props {
  displayName: string;
  picture?: string;
  isVisible: boolean;
  description?: string;
  gameMode: GameMode;
  difficulty: Difficulty;
  estimatedTime: number;
}

export const GameDetailHeader: FC<Props> = props => {
  const {
    displayName,
    picture,
    isVisible,
    description,
    gameMode,
    difficulty,
    estimatedTime,
  } = props;
  const gameModeInfo = GAME_MODES[gameMode];
  const difficultyInfo = DIFFICULTY[difficulty];

  return (
    <div className='mb-8 space-y-6'>
      <div className='flex flex-col gap-6 md:flex-row md:items-start'>
        <div className='relative h-48 w-full overflow-hidden rounded-xl md:h-64 md:w-64 md:flex-shrink-0'>
          {picture ? (
            <Image
              src={getImage(picture)}
              alt={displayName}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 256px'
              priority
            />
          ) : (
            <div className='from-primary/20 to-primary/10 flex h-full w-full items-center justify-center bg-gradient-to-br'>
              <div className='text-center'>
                <div className='mb-2 text-4xl'>🎮</div>
                <p className='text-muted-foreground text-sm font-medium'>
                  {displayName}
                </p>
              </div>
            </div>
          )}
          {/* Бейдж статуса поверх картинки */}
          <div className='absolute top-3 left-3'>
            <Badge
              variant={isVisible ? 'default' : 'secondary'}
              className={cn(
                'text-xs font-semibold',
                isVisible && 'bg-green-500/90 hover:bg-green-600'
              )}
            >
              {isVisible ? 'Доступно' : 'Скрыто'}
            </Badge>
          </div>
        </div>

        {/* Текстовая информация */}
        <div className='flex-1 space-y-4'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight md:text-4xl'>
              {displayName}
            </h1>

            <div className='mt-4 flex flex-wrap gap-2'>
              <Badge variant='outline' className='gap-1'>
                <span className='text-xs'>🎮</span>
                {gameModeInfo.label}
              </Badge>
              <Badge variant='outline' className='gap-1'>
                <span className='text-xs'>🎯</span>
                {difficultyInfo.label}
              </Badge>
              <Badge variant='outline' className='gap-1'>
                <span className='text-xs'>⏱️</span>
                {estimatedTime} min
              </Badge>
            </div>
          </div>

          {description && (
            <p className='text-muted-foreground text-lg leading-relaxed'>
              {description}
            </p>
          )}

          {/* Дополнительная информация под описанием */}
          <div className='grid grid-cols-2 gap-4 rounded-lg pt-4 sm:grid-cols-4'>
            <div className='space-y-1'>
              <p className='text-muted-foreground text-xs font-medium'>
                Game mode
              </p>
              <p className='font-semibold'>{gameModeInfo.label}</p>
            </div>
            <div className='space-y-1'>
              <p className='text-muted-foreground text-xs font-medium'>
                Complexity
              </p>
              <div className='flex items-center gap-2'>
                <div
                  className={cn(
                    'h-2 w-2 rounded-full',
                    difficulty === 'EASY' && 'bg-green-500',
                    difficulty === 'MEDIUM' && 'bg-yellow-500',
                    difficulty === 'HARD' && 'bg-red-500'
                  )}
                />
                <p className='font-semibold'>{difficultyInfo.label}</p>
              </div>
            </div>
            <div className='space-y-1'>
              <p className='text-muted-foreground text-xs font-medium'>
                Game time
              </p>
              <p className='font-semibold'>~{estimatedTime} min</p>
            </div>
            <div className='space-y-1'>
              <p className='text-muted-foreground text-xs font-medium'>
                Status
              </p>
              <Badge
                variant={isVisible ? 'default' : 'outline'}
                className={cn(
                  'text-xs',
                  isVisible && 'bg-green-100 text-green-800 hover:bg-green-100'
                )}
              >
                {isVisible ? 'Активна' : 'Скрыта'}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
