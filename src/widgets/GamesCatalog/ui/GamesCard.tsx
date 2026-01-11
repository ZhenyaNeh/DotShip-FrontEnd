'use client';

import { Clock, Target, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { GameDeleteDialog } from './GameForm/GameDeleteDialog';
import { GameForm } from './GameForm/GameForm';
import { cn } from '@/src/shared/lib/clsx';
import { getImage } from '@/src/shared/lib/get-image';
import { IGame } from '@/src/shared/lib/types';
import { DIFFICULTY, GAME_ICONS, GAME_MODES } from '@/src/shared/lib/utils';
import { Badge } from '@/src/shared/ui/Badge/Badge';
import { Button } from '@/src/shared/ui/Button/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/shared/ui/Card/Card';

interface GameCardProps {
  game: IGame;
  isUserAdmin: boolean;
  className?: string;
}

export const GamesCard: FC<GameCardProps> = props => {
  const { game, isUserAdmin, className } = props;
  const gameMode = GAME_MODES[game.gameMode];
  const difficulty = DIFFICULTY[game.difficulty];

  return (
    <Card
      className={cn(
        'dark:shadow-foreground/20 overflow-hidden transition-all hover:shadow-lg',
        className
      )}
    >
      <div className='relative h-48 w-full overflow-hidden'>
        {game.picture ? (
          <Image
            src={getImage(game.picture)}
            alt={game.displayName}
            fill
            className='object-cover transition-transform duration-300 hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        ) : (
          <div className='flex h-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600'>
            <span className='text-6xl'>{GAME_ICONS[game.gameMode]}</span>
          </div>
        )}
        <div className='absolute top-3 left-3'>
          <Badge variant='secondary' className='font-semibold'>
            {gameMode.label}
          </Badge>
        </div>
        {isUserAdmin && (
          <div className='absolute top-3 right-3 grid grid-cols-2 gap-3'>
            <GameForm game={game} />
            <GameDeleteDialog game={game} />
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span className='truncate'>{game.displayName}</span>
          <Badge variant='outline'>{difficulty.label}</Badge>
        </CardTitle>
        <CardDescription className='line-clamp-2'>
          {game.description || gameMode.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className='grid grid-cols-2 gap-4 text-sm'>
          <div className='flex items-center gap-2'>
            <Users className='text-muted-foreground h-4 w-4' />
            <span className='font-medium'>
              {game.minPlayers === game.maxPlayers
                ? `${game.minPlayers} player`
                : `${game.minPlayers}-${game.maxPlayers} players`}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Clock className='text-muted-foreground h-4 w-4' />
            <span className='font-medium'>~{game.estimatedTime} min</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild className='w-full'>
          <Link href={`/games-catalog/${game.id}`}>
            <Target className='mr-2 h-4 w-4' />
            Play
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
