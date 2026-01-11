'use client';

import {
  CheckCircle,
  Clock,
  Crown,
  Globe,
  Lock,
  Trash2,
  Users,
} from 'lucide-react';
import React, { FC } from 'react';

import { useDeleteRoomMutation } from '../hooks';
import { ActiveGame, GameType } from '../types';

import { getImage } from '@/src/shared/lib/get-image';
import { GameMode } from '@/src/shared/lib/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/src/shared/ui/AlertDialog/AlertDialog';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/shared/ui/Avatar/Avatar';
import { Badge } from '@/src/shared/ui/Badge/Badge';
import { Button } from '@/src/shared/ui/Button/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/shared/ui/Card/Card';
import { Skeleton } from '@/src/shared/ui/Skeleton/Skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/shared/ui/Table/Table';
import { BattleRoyalRoomStatus } from '@/src/widgets/BattleRoyal/types/battle-royal-initial.types';

interface ActiveGamesTabProps {
  activeGames?: ActiveGame[];
  isLoading: boolean;
}

// Функция для форматирования даты
const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const getGameTypeBadgeVariant = (type: GameType) => {
  switch (type) {
    case 'CLASSIC':
      return 'default';
    case 'BATTLE_ROYAL':
      return 'destructive';
    default:
      return 'secondary';
  }
};

const getStatusIcon = (status?: BattleRoyalRoomStatus) => {
  switch (status) {
    case 'WAITING':
      return <Clock className='h-3 w-3' />;
    case 'IN_PROGRESS':
      return <Clock className='h-3 w-3' />;
    case 'FINISHED':
      return <CheckCircle className='h-3 w-3' />;
    default:
      return null;
  }
};

export const ActiveGamesTab: FC<ActiveGamesTabProps> = ({
  activeGames,
  isLoading,
}) => {
  const { deleteActiveRoom } = useDeleteRoomMutation();

  // TODO: Реализовать логику удаления игры
  const handleDeleteGame = async (roomId: string, type: GameMode) => {
    await deleteActiveRoom({ roomId, type });
  };

  // Если данные загружаются
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Active Games</CardTitle>
          <CardDescription>Loading active games...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className='flex items-center space-x-4'>
                <Skeleton className='h-12 w-12 rounded-full' />
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-[250px]' />
                  <Skeleton className='h-4 w-[200px]' />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Если нет активных игр
  if (!activeGames || activeGames.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Active Games</CardTitle>
          <CardDescription>No active games found</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col items-center justify-center py-10'>
          <div className='text-muted-foreground mb-4'>
            <Users className='mx-auto h-16 w-16 opacity-50' />
          </div>
          <p className='text-muted-foreground text-center'>
            There are currently no active games. Games will appear here when
            users create them.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='text-2xl'>Active Games</CardTitle>
            <CardDescription>
              {activeGames.length} active game
              {activeGames.length !== 1 ? 's' : ''} in progress
            </CardDescription>
          </div>
          <Badge variant='outline' className='px-3 py-1'>
            <Users className='mr-2 h-4 w-4' />
            Total Players:{' '}
            {activeGames.reduce((sum, game) => sum + game.players.length, 0)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Game</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Privacy</TableHead>
              <TableHead>Players</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeGames.map(game => (
              <TableRow key={game.id} className='hover:bg-muted/50'>
                <TableCell>
                  <div className='flex items-center space-x-3'>
                    <div className='flex-shrink-0'>
                      <Avatar className='h-10 w-10 border'>
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/shapes/svg?seed=${game.gameId}`}
                          alt={game.game.displayName}
                        />
                        <AvatarFallback>
                          {game.game.displayName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className='flex flex-col'>
                      <span className='font-medium'>
                        {game.game.displayName}
                      </span>
                      <span className='text-muted-foreground text-xs'>
                        ID: {game.id.slice(0, 8)}...
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getGameTypeBadgeVariant(game.type)}>
                    {game.type === 'BATTLE_ROYAL' ? (
                      <>
                        <Crown className='mr-1 h-3 w-3' />
                        Battle Royal
                      </>
                    ) : (
                      'Classic'
                    )}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge>
                    {game.privacy === 'PUBLIC' ? (
                      <>
                        <Globe className='mr-1 h-3 w-3' />
                        Public
                      </>
                    ) : (
                      <>
                        <Lock className='mr-1 h-3 w-3' />
                        Private
                      </>
                    )}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className='flex flex-col space-y-2'>
                    <div className='flex -space-x-2'>
                      {game.players.slice(0, 3).map(player => (
                        <Avatar
                          key={player.id}
                          className='border-background h-8 w-8 border-2'
                        >
                          <AvatarImage
                            src={getImage(player.user.picture)}
                            alt={player.user.displayName}
                          />
                          <AvatarFallback>
                            {player.user.displayName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {game.players.length > 3 && (
                        <div className='border-background bg-muted flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs'>
                          +{game.players.length - 3}
                        </div>
                      )}
                    </div>
                    <span className='text-muted-foreground text-xs'>
                      {game.players.length} player
                      {game.players.length !== 1 ? 's' : ''}
                      {game.playerTurn && (
                        <span className='ml-1 font-medium'>
                          • Turn:{' '}
                          {game.players.find(p => p.userId === game.playerTurn)
                            ?.user.displayName || 'Unknown'}
                        </span>
                      )}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex flex-col'>
                    <span className='text-sm'>
                      {formatDate(game.createdAt)}
                    </span>
                    <span className='text-muted-foreground text-xs'>
                      Updated: {formatDate(game.updatedAt)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {game.status && (
                    <Badge>
                      <span className='flex items-center gap-1'>
                        {getStatusIcon(game.status)}
                        {game.status.replace('_', ' ')}
                      </span>
                    </Badge>
                  )}
                </TableCell>
                <TableCell className='text-right'>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant='destructive' size='sm'>
                        <Trash2 className='h-4 w-4' />
                        <span className='sr-only md:not-sr-only md:ml-2 md:inline'>
                          Delete
                        </span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription asChild>
                          <div className='text-muted-foreground text-sm'>
                            This action cannot be undone. This will permanently
                            delete the game &quot;{game.game.displayName}&quot;
                            and remove all associated data.
                            {game.players.length > 0 && (
                              <div className='bg-destructive/10 mt-2 rounded-md p-3'>
                                <p className='text-destructive text-sm font-medium'>
                                  Warning: This game has {game.players.length}{' '}
                                  active player
                                  {game.players.length !== 1 ? 's' : ''}.
                                  Deleting it will disconnect them.
                                </p>
                              </div>
                            )}
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            handleDeleteGame(game.id, game.game.gameMode)
                          }
                          className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                        >
                          Delete Game
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
