'use client';

import {
  Award,
  Heart,
  MapPin,
  Skull,
  Swords,
  Target,
  Trophy,
  User,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { GameResultSummary } from '../types/battle-royal-game-over.types';

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
} from '@/src/shared/ui/Dialog/Dialog';
import { ScrollArea } from '@/src/shared/ui/ScrollArea/ScrollArea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/shared/ui/Table/Table';

interface GameResultDialogProps {
  isOpen: boolean;
  onClose: () => void;
  result: GameResultSummary;
}

export const GameResultDialog: FC<GameResultDialogProps> = ({
  isOpen,
  onClose,
  result,
}) => {
  const router = useRouter();
  if (!result) return null;

  const winner = result.players.find(p => p.isWinner);
  const sortedPlayers = [...result.players].sort(
    (a, b) => a.eliminationOrder - b.eliminationOrder
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-h-[92vh] min-w-2xl overflow-hidden'>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl font-bold'>
            Match results
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <ScrollArea className='max-h-[calc(90vh-150px)]'>
          <div className='space-y-6 p-2'>
            {/* Победитель */}
            <div className='rounded-xl border border-yellow-500 bg-yellow-500/40 p-6 text-center'>
              <div className='mb-4 flex items-center justify-center gap-4'>
                <Trophy className='h-12 w-12 text-amber-500' />
                <div>
                  <h3 className='text-2xl font-bold'>WINNER</h3>
                  <p>Congratulations on your victory!</p>
                </div>
                <Trophy className='h-12 w-12 text-amber-500' />
              </div>

              {winner && (
                <div className='flex items-center justify-center gap-4'>
                  <Avatar className='h-20 w-20 border-4 border-amber-500'>
                    <AvatarImage src={getImage(winner.picture)} />
                    <AvatarFallback>
                      {winner.displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className='text-left'>
                    <h4 className='text-xl font-bold'>{winner.displayName}</h4>
                    <div className='mt-2 flex items-center gap-2'>
                      <Badge variant='outline'>
                        Рейтинг: {winner.rating} (
                        {winner.ratingChange > 0 ? '+' : ''}
                        {winner.ratingChange})
                      </Badge>
                      <Badge
                        variant='outline'
                        className='flex items-center gap-1'
                      >
                        <Swords className='h-3 w-3' />
                        {winner.kills} убийств
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Статистика матча */}
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
              <div className='bg-card rounded-lg border p-4'>
                <div className='mb-2 flex items-center gap-2'>
                  <MapPin className='h-5 w-5' />
                  <h4 className='font-semibold'>Match information</h4>
                </div>
                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Map:</span>
                    <span>
                      {result.room.fieldSize}x{result.room.fieldSize}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Moves played:</span>
                    <span>{result.room.turnNumber}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Players:</span>
                    <span>{result.totalPlayers}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Duration:</span>
                    <span>
                      {Math.round(
                        (new Date(result.room.finishedAt).getTime() -
                          new Date(result.room.createdAt).getTime()) /
                          60000
                      )}{' '}
                      min
                    </span>
                  </div>
                </div>
              </div>

              <div className='bg-card rounded-lg border p-4'>
                <div className='mb-2 flex items-center gap-2'>
                  <Target className='h-5 w-5' />
                  <h4 className='font-semibold'>Combat statistics</h4>
                </div>
                <div className='space-y-3'>
                  {result.players.slice(0, 3).map(player => (
                    <div
                      key={player.id}
                      className='flex items-center justify-between'
                    >
                      <span className='mr-2 truncate'>
                        {player.displayName}
                      </span>
                      <Badge variant='outline'>{player.kills} kills</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className='bg-card rounded-lg border p-4'>
                <div className='mb-2 flex items-center gap-2'>
                  <Award className='h-5 w-5' />
                  <h4 className='font-semibold'>Rating change</h4>
                </div>
                <div className='space-y-3'>
                  {result.players.map(player => (
                    <div key={player.id} className='space-y-1'>
                      <div className='flex justify-between text-sm'>
                        <span className='truncate'>{player.displayName}</span>
                        <span>
                          {player.ratingChange > 0 ? '+' : ''}
                          {player.ratingChange}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Таблица игроков */}
            <div className='bg-card overflow-hidden rounded-lg border'>
              <div className='bg-muted p-4'>
                <h4 className='flex items-center gap-2 font-semibold'>
                  <User className='h-5 w-5' />
                  Player table ({result.totalPlayers})
                </h4>
              </div>

              <div className='overflow-x-auto'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-16'>Place</TableHead>
                      <TableHead>Player</TableHead>
                      <TableHead className='w-24'>Kills</TableHead>
                      <TableHead className='w-20'>Damage</TableHead>
                      <TableHead className='w-24'>Distance</TableHead>
                      <TableHead className='w-32'>Rating</TableHead>
                      <TableHead className='w-32'>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedPlayers.map((player, index) => (
                      <TableRow key={player.id}>
                        <TableCell>
                          <div className='flex items-center justify-start'>
                            <Badge variant='outline' className='font-normal'>
                              #{index + 1}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='flex items-center gap-3'>
                            <Avatar className='h-8 w-8'>
                              <AvatarImage
                                src={getImage(player.picture)}
                                alt={player.displayName}
                              />
                              <AvatarFallback>
                                {player.displayName.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                              <span className='text-sm font-medium'>
                                {player.displayName}
                              </span>
                              <span className='text-muted-foreground text-xs'>
                                {player.eliminationOrder === 1
                                  ? 'Первый выбывший'
                                  : player.isWinner
                                    ? 'Победитель'
                                    : player.eliminationOrder
                                      ? `Выбыл ${player.eliminationOrder}-м`
                                      : 'Участник'}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='flex items-center gap-1.5'>
                            <Skull className='h-4 w-4' />
                            <span className='font-medium'>{player.kills}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='ml-1 flex items-center gap-1.5'>
                            <Swords className='h-4 w-4' />
                            <span className='font-medium'>
                              {player.damageDealt}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='ml-1 flex items-center gap-1.5'>
                            <MapPin className='h-4 w-4' />
                            <span className='font-medium'>
                              {player.distanceTraveled}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='flex flex-col gap-0.5'>
                            <div className='flex items-center gap-1.5'>
                              <span className='font-medium'>
                                {player.rating}
                              </span>
                              <span>
                                {'('}
                                {player.ratingChange > 0 ? '+' : ''}
                                {player.ratingChange}
                                {')'}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={player.isWinner ? 'default' : 'outline'}
                            className={`${player.isWinner ? 'bg-amber-500 hover:bg-amber-600' : ''}`}
                          >
                            {player.isWinner ? (
                              <div className='flex items-center gap-1.5'>
                                <Trophy className='h-3 w-3' />
                                <span>Winner</span>
                              </div>
                            ) : (
                              <div className='flex items-center gap-1.5'>
                                <X className='h-3 w-3' />
                                <span>Loser</span>
                              </div>
                            )}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className='bg-card rounded-lg border p-4'>
              <h4 className='mb-4 font-semibold'>Match achievements</h4>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                <div className='bg-muted/30 flex items-center gap-3 rounded-lg p-3'>
                  <Swords className='h-8 w-8' />
                  <div>
                    <div className='font-medium'>The most deadly</div>
                    <div className='text-muted-foreground text-sm'>
                      {
                        result.players.reduce((max, p) =>
                          p.kills > max.kills ? p : max
                        ).displayName
                      }
                      (
                      {
                        result.players.reduce((max, p) =>
                          p.kills > max.kills ? p : max
                        ).kills
                      }{' '}
                      kills)
                    </div>
                  </div>
                </div>

                <div className='bg-muted/30 flex items-center gap-3 rounded-lg p-3'>
                  <Heart className='h-8 w-8' />
                  <div>
                    <div className='font-medium'>The most durable</div>
                    <div className='text-muted-foreground text-sm'>
                      {sortedPlayers[sortedPlayers.length - 1]?.displayName}
                    </div>
                  </div>
                </div>

                <div className='bg-muted/30 flex items-center gap-3 rounded-lg p-3'>
                  <Target className='h-8 w-8' />
                  <div>
                    <div className='font-medium'>The most mobile</div>
                    <div className='text-muted-foreground text-sm'>
                      {
                        result.players.reduce((max, p) =>
                          p.distanceTraveled > max.distanceTraveled ? p : max
                        ).displayName
                      }
                      (
                      {
                        result.players.reduce((max, p) =>
                          p.distanceTraveled > max.distanceTraveled ? p : max
                        ).distanceTraveled
                      }{' '}
                      cells)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className='flex justify-end gap-3 border-t pt-4 pb-4'>
          <Button variant='outline' onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => router.push('/games-catalog')}>
            Go to game catalog
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
