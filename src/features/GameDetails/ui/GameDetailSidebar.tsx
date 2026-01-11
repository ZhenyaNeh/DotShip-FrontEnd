import { ChevronRight } from 'lucide-react';
import { FC } from 'react';

import { GameQuickRules } from './GameQuickRules';
import { GameStartCard } from './GameStartCard';
import { cn } from '@/src/shared/lib/clsx';
import { IGame } from '@/src/shared/lib/types';
import { DIFFICULTY, GAME_MODES } from '@/src/shared/lib/utils';
import { Button } from '@/src/shared/ui/Button/Button';

interface Props {
  game: IGame;
  onStartGame?: (gameId: string) => void;
  onShowRules: () => void;
}

export const GameDetailSidebar: FC<Props> = props => {
  const { game, onStartGame, onShowRules } = props;
  const difficultyInfo = DIFFICULTY[game.difficulty];
  const gameModeInfo = GAME_MODES[game.gameMode];

  const handleStartGame = () => {
    if (onStartGame) {
      onStartGame(game.id);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='sticky top-8 space-y-6'>
        <GameStartCard
          gameId={game.id}
          gameMode={game.gameMode}
          minPlayers={game.minPlayers}
          maxPlayers={game.maxPlayers}
          difficulty={difficultyInfo.label}
          estimatedTime={game.estimatedTime}
          onStartGame={handleStartGame}
        />

        {game.rules && game.rules.length > 0 && (
          <>
            <GameQuickRules
              rules={game.rules.slice(0, 3)}
              onShowAll={onShowRules}
            />

            <div className='bg-card rounded-xl border p-5'>
              <h4 className='mb-3 font-semibold'>Game mode</h4>
              <p className='text-muted-foreground mb-4 text-sm'>
                {gameModeInfo.description}
              </p>
              <div
                className={cn(
                  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium'
                )}
              >
                Сложность: {difficultyInfo.label}
              </div>
            </div>
          </>
        )}

        <div className='bg-muted/30 rounded-xl border p-5'>
          <h4 className='mb-3 font-semibold'>Advice</h4>
          <p className='text-muted-foreground mb-3 text-sm'>
            Before starting the game, it is recommended to read the rules.
          </p>
          <Button
            variant='outline'
            size='sm'
            className='w-full'
            onClick={onShowRules}
          >
            Read the rules
            <ChevronRight className='ml-2 h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  );
};
