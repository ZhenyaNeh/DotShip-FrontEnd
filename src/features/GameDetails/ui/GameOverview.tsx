import { Clock, Users2 } from 'lucide-react';
import { FC } from 'react';

import { IGame } from '@/src/shared/lib/types';
import { GAME_MODES } from '@/src/shared/lib/utils';

interface Props {
  game: IGame;
}

export const GameOverview: FC<Props> = ({ game }) => {
  const gameModeInfo = GAME_MODES[game.gameMode];

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='mb-4 text-xl font-semibold'>About the game</h3>
        <p className='text-muted-foreground leading-relaxed'>
          {game.description ||
            `${gameModeInfo.label} - это захватывающая версия морского боя. Игра подходит для компании от ${game.minPlayers} до ${game.maxPlayers} игроков и предлагает увлекательный игровой процесс с средней продолжительностью партии ${game.estimatedTime} минут.`}
        </p>
      </div>

      <div className='grid grid-cols-2 gap-6'>
        <div className='bg-card space-y-3 rounded-lg border p-4'>
          <div className='flex items-center gap-2'>
            <Users2 className='text-primary h-5 w-5' />
            <h4 className='font-semibold'>Number of players</h4>
          </div>
          <p className='text-muted-foreground text-sm'>
            Ideal for{' '}
            {game.minPlayers === game.maxPlayers
              ? `${game.minPlayers} игрока`
              : `компании от ${game.minPlayers} до ${game.maxPlayers} игроков`}
          </p>
        </div>

        <div className='bg-card space-y-3 rounded-lg border p-4'>
          <div className='flex items-center gap-2'>
            <Clock className='text-primary h-5 w-5' />
            <h4 className='font-semibold'>Game time</h4>
          </div>
          <p className='text-muted-foreground text-sm'>
            The average duration of a game is {game.estimatedTime} minutes
          </p>
        </div>
      </div>
    </div>
  );
};
