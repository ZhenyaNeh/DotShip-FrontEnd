import { Clock, Target, Users, Zap } from 'lucide-react';
import { FC } from 'react';

import { FriendInvite } from '../../FriendInvite';

import { GameMode } from '@/src/shared/lib/types';
import { Button } from '@/src/shared/ui/Button/Button';

interface Props {
  gameId: string;
  gameMode: GameMode;
  minPlayers: number;
  maxPlayers: number;
  difficulty: string;
  estimatedTime: number;
  onStartGame: () => void;
}

export const GameStartCard: FC<Props> = props => {
  const {
    gameId,
    gameMode,
    minPlayers,
    maxPlayers,
    difficulty,
    estimatedTime,
    onStartGame,
  } = props;

  return (
    <div className='from-card to-card/50 overflow-hidden rounded-xl border bg-gradient-to-br shadow-lg'>
      <div className='space-y-6 p-6'>
        <div className='space-y-2'>
          <h3 className='text-xl font-bold'>Start game</h3>
          <p className='text-muted-foreground text-sm'>
            Are you ready for an exciting battle?
          </p>
        </div>

        <div className='space-y-4'>
          <div className='bg-primary/5 flex items-center justify-between rounded-lg p-3'>
            <span className='text-sm font-medium'>Players</span>
            <div className='flex items-center gap-2'>
              <Users className='h-4 w-4' />
              <span className='font-bold'>
                {minPlayers === maxPlayers
                  ? `${minPlayers}`
                  : `${minPlayers}-${maxPlayers}`}
              </span>
            </div>
          </div>

          <div className='bg-primary/5 flex items-center justify-between rounded-lg p-3'>
            <span className='text-sm font-medium'>Complexity</span>
            <div className='flex items-center gap-2'>
              <Target className='h-4 w-4' />
              <span className='font-bold'>{difficulty}</span>
            </div>
          </div>

          <div className='bg-primary/5 flex items-center justify-between rounded-lg p-3'>
            <span className='text-sm font-medium'>Time</span>
            <div className='flex items-center gap-2'>
              <Clock className='h-4 w-4' />
              <span className='font-bold'>{estimatedTime} min</span>
            </div>
          </div>
        </div>

        <Button
          size='lg'
          className='w-full gap-2 py-6 text-base font-semibold'
          onClick={onStartGame}
        >
          <Zap className='h-5 w-5' />
          Start game
        </Button>

        <FriendInvite gameId={gameId} gameMode={gameMode} />

        <p className='text-muted-foreground text-center text-xs'>
          Click to create a game room
        </p>
      </div>
    </div>
  );
};
