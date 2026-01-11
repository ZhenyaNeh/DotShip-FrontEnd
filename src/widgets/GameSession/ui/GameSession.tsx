'use client';

import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { useInitialGameState } from '../hooks/ui/useInitialGameState';

import { EventDialog } from './EventDialog';
import { GameOverResult } from './GameOverResult';
import { TimerCircle } from './TimerCircle';
import { Board, BoardComponentTypes } from '@/src/features/Board';
import { SoundControl } from '@/src/features/SoundControl';
import { useProfile, useSound } from '@/src/shared/hooks';
import { useGameSession } from '@/src/shared/hooks/useGameSession/useGameSession';
import { GameMode, LocalStorageHit } from '@/src/shared/lib/types';
import { eventAlreadyHitTokenInstance } from '@/src/shared/lib/utils';

export const GameSession: FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [openResultDialog, setOpenResultDialog] = useState<boolean>(false);
  const isAlreadySound = useRef<boolean>(false);
  const { user } = useProfile();
  const { playSound } = useSound();

  const { initialGameState, isLoading } = useInitialGameState(roomId);
  const {
    gameState,
    selectedEvent,
    openEventDialog,
    setGameState,
    setSelectedEvent,
    setOpenEventDialog,
  } = useGameSession();

  const handleOpenChangeResultDialog = useCallback(() => {
    if (!isAlreadySound.current) {
      if (initialGameState?.winner_id === user?.id) {
        playSound('win', 0.8);
      } else {
        playSound('lose', 0.8);
      }
      isAlreadySound.current = true;
    } else {
      isAlreadySound.current = false;
    }
    setOpenResultDialog(prev => !prev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialGameState?.winner_id, user?.id]);

  const handleOpenChangeEventDialog = useCallback(() => {
    setOpenEventDialog(prev => !prev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setGameState(initialGameState);
    if (initialGameState?.winner_id) {
      handleOpenChangeResultDialog();
    }

    if (
      initialGameState &&
      initialGameState?.player_user.moves.length < 1 &&
      initialGameState?.player_opponent.moves.length < 1
    ) {
      eventAlreadyHitTokenInstance.set(LocalStorageHit.NO_HIT);
    }

    if (
      initialGameState?.room.gameMode === GameMode.EVENTS &&
      initialGameState.playerTurn === initialGameState.player_user.user.id &&
      eventAlreadyHitTokenInstance.get() === LocalStorageHit.NO_HIT
    ) {
      handleOpenChangeEventDialog();
    }
  }, [
    handleOpenChangeEventDialog,
    handleOpenChangeResultDialog,
    initialGameState,
    setGameState,
  ]);

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Loader2 className='size-16 animate-spin md:size-30' />
      </div>
    );
  }

  return (
    <div className='flex w-full flex-col items-center justify-start py-3'>
      <h1 className='mb-3 w-full text-center text-2xl font-bold md:text-3xl lg:text-4xl'>
        Sea Battle
      </h1>

      <div className='flex w-full max-w-xl justify-between p-5'>
        {initialGameState?.winner_id && (
          <GameOverResult
            initialGameState={initialGameState}
            open={openResultDialog}
            handleOpenChange={handleOpenChangeResultDialog}
          />
        )}
        <SoundControl />
      </div>

      {!initialGameState?.winner_id &&
        initialGameState?.room.gameMode === GameMode.EVENTS && (
          <EventDialog
            open={openEventDialog}
            selectedEvent={selectedEvent}
            handleOpenChange={handleOpenChangeEventDialog}
            setSelectedEvent={setSelectedEvent}
          />
        )}

      {initialGameState ? (
        <div className='flex w-full max-w-xl flex-col items-center justify-center gap-4 lg:flex-row lg:items-stretch lg:gap-8 xl:gap-8'>
          {/* Левое поле */}
          <div className='w-full'>
            <Board
              type={BoardComponentTypes.GAME}
              user={gameState?.player_user.user}
              ships={gameState?.player_user.ships}
              moves={gameState?.player_opponent.moves}
              isUserBoard={true}
            />
          </div>

          {/* Стрелка */}
          {!gameState?.winner_id && (
            <div className='mb-5 flex items-center justify-center lg:mb-0 lg:flex-col lg:justify-center'>
              <TimerCircle
                duration={20}
                isPlayerTurn={
                  gameState?.playerTurn === gameState?.player_user.user.id
                }
                size={70}
                strokeWidth={6}
              />
            </div>
          )}

          {/* Правое поле */}
          <div className='w-full'>
            <Board
              type={BoardComponentTypes.GAME}
              user={gameState?.player_opponent.user}
              ships={gameState?.player_opponent.ships}
              moves={gameState?.player_user.moves}
              isUserBoard={false}
            />
          </div>
        </div>
      ) : (
        <div className='flex min-h-[50vh] items-center justify-center'>
          <Loader2 className='size-16 animate-spin md:size-20' />
        </div>
      )}

      <h2 className='text-muted-foreground mt-8 w-full text-center text-sm font-medium md:mt-10 md:text-base'>
        Room ID: <span className='font-mono font-bold'>{roomId}</span>
      </h2>
    </div>
  );
};
