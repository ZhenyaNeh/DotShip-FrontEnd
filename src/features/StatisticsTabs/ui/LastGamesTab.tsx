'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Clock, Crosshair, Skull, Swords, Trophy } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { LastGames, LastGamesResult } from '../types';

import { getImage } from '@/src/shared/lib/get-image';
import { GameMode } from '@/src/shared/lib/types';
import { Badge } from '@/src/shared/ui/Badge/Badge';
import { Button } from '@/src/shared/ui/Button/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/shared/ui/Card/Card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/shared/ui/Table/Table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/shared/ui/Tabs/Tabs';

interface LastGamesTabProps {
  lastGames?: LastGames;
  isLoading?: boolean;
}

export const LastGamesTab: React.FC<LastGamesTabProps> = ({
  lastGames,
  isLoading,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<'classic' | 'battleRoyal'>(
    'classic'
  );

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Game History</CardTitle>
        </CardHeader>
        <CardContent className='flex h-[400px] items-center justify-center'>
          <div className='text-muted-foreground'>Loading game history...</div>
        </CardContent>
      </Card>
    );
  }

  if (!lastGames) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Game History</CardTitle>
        </CardHeader>
        <CardContent className='flex h-[400px] items-center justify-center'>
          <div className='text-muted-foreground'>No game history available</div>
        </CardContent>
      </Card>
    );
  }

  const handleShowGame = (roomId: string, isBattleRoyal: boolean) => {
    const path = isBattleRoyal
      ? `/sea-battle/battle-royal/${roomId}`
      : `/sea-battle/${roomId}`;
    router.push(path);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getResultBadge = (result: LastGamesResult) => {
    switch (result) {
      case 'WIN':
        return (
          <Badge className='bg-chart-1'>
            <Trophy className='mr-1 h-3 w-3' />
            Win
          </Badge>
        );
      case 'LOSS':
        return (
          <Badge className='bg-chart-2'>
            <Skull className='mr-1 h-3 w-3' />
            Loss
          </Badge>
        );
      case 'IN_PROGRESS':
        return (
          <Badge className='bg-chart-3'>
            <Clock className='mr-1 h-3 w-3' />
            In Progress
          </Badge>
        );
      default:
        return <Badge variant='outline'>Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Game History</CardTitle>
        <CardDescription>View your recent games and results</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue='classic'
          value={activeTab}
          onValueChange={(value: string) =>
            setActiveTab(value as 'classic' | 'battleRoyal')
          }
        >
          <TabsList className='bg-primary/5 grid w-full grid-cols-2 dark:bg-gray-700'>
            <TabsTrigger value='classic'>
              <Swords className='mr-2 h-4 w-4' />
              Classic Games
              <Badge variant='secondary' className='ml-2'>
                {lastGames.classic.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value='battleRoyal'>
              <Crosshair className='mr-2 h-4 w-4' />
              Battle Royal
              <Badge variant='secondary' className='ml-2'>
                {lastGames.battleRoyal.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value='classic'>
            {lastGames.classic.length === 0 ? (
              <div className='flex h-[300px] flex-col items-center justify-center p-8 text-center'>
                <Swords className='text-muted-foreground mb-4 h-12 w-12' />
                <h3 className='mb-2 text-lg font-semibold'>No Classic Games</h3>
                <p className='text-muted-foreground'>
                  You haven&apos;t played any classic games yet.
                </p>
              </div>
            ) : (
              <div className='rounded-md border'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Game</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lastGames.classic.map(game => (
                      <TableRow key={game.roomId}>
                        <TableCell>
                          <div className='flex items-center gap-3'>
                            <div className='relative h-10 w-10 overflow-hidden rounded-md'>
                              {game.gamePicture ? (
                                <Avatar>
                                  <AvatarImage
                                    src={getImage(game.gamePicture)}
                                    alt={game.gameName}
                                  />
                                  <AvatarFallback>
                                    {game.gameName.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                              ) : (
                                <div className='bg-muted flex h-full w-full items-center justify-center'>
                                  <Swords className='h-5 w-5' />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className='font-medium'>{game.gameName}</div>
                              <div className='text-muted-foreground text-xs'>
                                {game.gameMode === GameMode.CLASSIC
                                  ? 'Classic game'
                                  : 'With events'}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='flex items-center gap-2'>
                            <Clock className='text-muted-foreground h-3 w-3' />
                            <span className='text-sm'>
                              {formatDate(game.date)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{getResultBadge(game.result)}</TableCell>
                        <TableCell className='text-right'>
                          <Button
                            size='sm'
                            onClick={() => handleShowGame(game.roomId, false)}
                            variant='outline'
                          >
                            Show Game
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value='battleRoyal'>
            {lastGames.battleRoyal.length === 0 ? (
              <div className='flex h-[300px] flex-col items-center justify-center p-8 text-center'>
                <Crosshair className='text-muted-foreground mb-4 h-12 w-12' />
                <h3 className='mb-2 text-lg font-semibold'>
                  No Battle Royal Games
                </h3>
                <p className='text-muted-foreground'>
                  You haven&apos;t played any battle royal games yet.
                </p>
              </div>
            ) : (
              <div className='rounded-md border'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Game</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Stats</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lastGames.battleRoyal.map(game => (
                      <TableRow key={game.roomId}>
                        <TableCell>
                          <div className='flex items-center gap-3'>
                            <div className='relative h-10 w-10 overflow-hidden rounded-md'>
                              {game.gamePicture ? (
                                <Image
                                  src={game.gamePicture}
                                  alt={game.gameName}
                                  fill
                                  className='object-cover'
                                />
                              ) : (
                                <div className='bg-muted flex h-full w-full items-center justify-center'>
                                  <Crosshair className='h-5 w-5' />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className='font-medium'>{game.gameName}</div>
                              <div className='text-muted-foreground text-xs'>
                                Battle Royal
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='flex items-center gap-2'>
                            <Clock className='text-muted-foreground h-3 w-3' />
                            <span className='text-sm'>
                              {formatDate(game.date)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='flex flex-col gap-1'>
                            <div className='flex items-center gap-1 text-sm'>
                              <span
                                className={
                                  game.isAlive
                                    ? 'text-green-600'
                                    : 'text-red-600'
                                }
                              >
                                {game.isAlive ? 'Alive' : 'Eliminated'}
                              </span>
                            </div>
                            <div className='flex items-center gap-1 text-sm'>
                              <Trophy className='h-3 w-3' />
                              <span>{game.kills} kills</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getResultBadge(game.result)}</TableCell>
                        <TableCell className='text-right'>
                          <Button
                            size='sm'
                            onClick={() => handleShowGame(game.roomId, true)}
                            variant='outline'
                          >
                            Show Game
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Summary Stats */}
        <div className='mt-6 grid gap-4 md:grid-cols-3'>
          <div className='rounded-lg border p-4'>
            <div className='mb-2 flex items-center justify-between'>
              <div className='text-muted-foreground text-sm font-medium'>
                Total Games
              </div>
              <Swords className='h-4 w-4' />
            </div>
            <div className='text-2xl font-bold'>
              {lastGames.classic.length + lastGames.battleRoyal.length}
            </div>
            <div className='text-muted-foreground mt-1 text-sm'>
              {lastGames.classic.length} classic •{' '}
              {lastGames.battleRoyal.length} battle royal
            </div>
          </div>

          <div className='rounded-lg border p-4'>
            <div className='mb-2 flex items-center justify-between'>
              <div className='text-muted-foreground text-sm font-medium'>
                Wins
              </div>
              <Trophy className='h-4 w-4' />
            </div>
            <div className='text-2xl font-bold'>
              {
                [...lastGames.classic, ...lastGames.battleRoyal].filter(
                  g => g.result === 'WIN'
                ).length
              }
            </div>
            <div className='text-muted-foreground mt-1 text-sm'>
              {lastGames.classic.filter(g => g.result === 'WIN').length} in
              classic
            </div>
          </div>

          <div className='rounded-lg border p-4'>
            <div className='mb-2 flex items-center justify-between'>
              <div className='text-muted-foreground text-sm font-medium'>
                Active Games
              </div>
              <Clock className='h-4 w-4' />
            </div>
            <div className='text-2xl font-bold'>
              {
                [...lastGames.classic, ...lastGames.battleRoyal].filter(
                  g => g.result === 'IN_PROGRESS'
                ).length
              }
            </div>
            <div className='text-muted-foreground mt-1 text-sm'>
              Continue playing to finish
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
