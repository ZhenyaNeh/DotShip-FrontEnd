import { Trophy, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

import { InitialGameState } from '../types/initial-game-state.types';

import { getImage } from '@/src/shared/lib/get-image';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/shared/ui/Avatar/Avatar';
import { Badge } from '@/src/shared/ui/Badge/Badge';
import { Button } from '@/src/shared/ui/Button/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/shared/ui/Dialog/Dialog';

interface Props {
  initialGameState: InitialGameState;
  open: boolean;
  handleOpenChange: () => void;
}

export const GameOverResult: FC<Props> = props => {
  const { initialGameState, open, handleOpenChange } = props;
  const router = useRouter();

  const isWinner =
    initialGameState?.winner_id === initialGameState?.player_user.user.id;
  const winner = initialGameState?.winner_id
    ? initialGameState.winner_id === initialGameState.player_user.user.id
      ? initialGameState.player_user
      : initialGameState.player_opponent
    : null;

  const userRatingInfo = initialGameState?.player_user.ratingHistory;
  const opponentRatingInfo = initialGameState?.player_opponent.ratingHistory;

  return (
    <div className='mb-5'>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant='outline'>Match results</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-md md:max-w-lg'>
          <DialogHeader>
            <DialogTitle className='flex items-center justify-center gap-2 text-2xl'>
              <Trophy className='size-8 text-yellow-500' />
              Игра завершена!
            </DialogTitle>
            <DialogDescription className='text-center text-base'>
              {isWinner
                ? 'Поздравляем с победой!'
                : 'К сожалению, вы проиграли.'}
            </DialogDescription>
          </DialogHeader>

          <div className='py-4'>
            {/* Информация о победителе */}
            <div className='bg-muted/50 mb-6 rounded-lg p-4'>
              <div className='mb-3 flex items-center justify-center gap-3'>
                <Avatar className='size-12 border-2 border-yellow-500'>
                  <AvatarImage
                    src={getImage(winner?.user.picture)}
                    alt={winner?.user.displayName}
                  />
                  <AvatarFallback>
                    <User className='size-6' />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className='text-lg font-semibold'>
                    {winner?.user.displayName}
                  </h3>
                  <div className='flex items-center gap-2'>
                    <Badge
                      variant={isWinner ? 'default' : 'secondary'}
                      className='gap-1'
                    >
                      <Trophy className='size-3' />
                      Победитель
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Статистика игры */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='bg-background rounded-md p-3'>
                  <p className='text-muted-foreground text-sm'>Ваш рейтинг</p>
                  <div className='flex items-center gap-2'>
                    <span className='text-xl font-bold'>
                      {userRatingInfo?.newRating ||
                        initialGameState?.player_user.user.rating ||
                        0}
                    </span>
                    {userRatingInfo?.ratingChange && (
                      <Badge
                        variant={
                          userRatingInfo.ratingChange > 0
                            ? 'default'
                            : 'destructive'
                        }
                      >
                        {initialGameState.winner_id ===
                        initialGameState.player_user.user.id
                          ? '+ '
                          : '- '}
                        {userRatingInfo.ratingChange}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className='bg-background rounded-md p-3'>
                  <p className='text-muted-foreground text-sm'>Противник</p>
                  <div className='flex items-center gap-2'>
                    <span className='text-xl font-bold'>
                      {opponentRatingInfo?.newRating ||
                        initialGameState?.player_opponent.user.rating ||
                        0}
                    </span>
                    {opponentRatingInfo?.ratingChange && (
                      <Badge
                        variant={
                          opponentRatingInfo.ratingChange > 0
                            ? 'default'
                            : 'destructive'
                        }
                      >
                        {initialGameState.winner_id ===
                        initialGameState.player_user.user.id
                          ? '- '
                          : '+ '}
                        {opponentRatingInfo.ratingChange}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Статистика ходов */}
              <div className='mt-4 grid grid-cols-2 gap-3'>
                <div className='bg-background rounded-md p-3'>
                  <p className='text-muted-foreground text-sm'>Ваши ходы</p>
                  <p className='text-2xl font-bold'>
                    {initialGameState?.player_user.moves.length || 0}
                  </p>
                </div>
                <div className='bg-background rounded-md p-3'>
                  <p className='text-muted-foreground text-sm'>
                    Ходы противника
                  </p>
                  <p className='text-2xl font-bold'>
                    {initialGameState?.player_opponent.moves.length || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Действия */}
            <div className='flex flex-col gap-3 sm:flex-row'>
              <Button
                className='flex-1'
                variant='default'
                onClick={() => router.push('/games-catalog')}
              >
                Go to game catalog
              </Button>
              <Button
                className='flex-1'
                variant='outline'
                onClick={handleOpenChange}
              >
                Show board
              </Button>
            </div>

            {/* Подпись */}
            <p className='text-muted-foreground mt-4 text-center text-xs'>
              Спасибо за игру! Вы можете сыграть еще раз или вернуться на
              главную страницу.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
