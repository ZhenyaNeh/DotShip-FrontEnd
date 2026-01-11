'use client';

import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { FC, useEffect } from 'react';

import { useBattleRoyalGameData } from '../hooks';
import { useGameOverData } from '../hooks/ui/useGameOverData';
import { BattleRoyalRoomStatus } from '../types/battle-royal-initial.types';

import { BattleRoyalBoard } from './BattleRoyalBoard';
import BattleRoyalUpgradeDialog from './BattleRoyalUpgradeDialog';
import { SoundControl } from '@/src/features/SoundControl';
import { useBattleRoyal } from '@/src/shared/hooks/useBattleRoyal/useBattleRoyal';

export const BattleRoyal: FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { battleRoyalGameData, isLoading } = useBattleRoyalGameData(roomId);
  const { gameOverData } = useGameOverData(roomId);

  const {
    gameState,
    selectedEvent,
    openEventDialog,
    setGameState,
    setGameOverResult,
    handleMove,
    handleSetBonus,
    setOpenEventDialog,
  } = useBattleRoyal();

  useEffect(() => {
    if (gameOverData) {
      setGameOverResult(gameOverData);
    }

    setGameState(battleRoyalGameData);
  }, [battleRoyalGameData, gameOverData, setGameOverResult, setGameState]);

  if (!gameState) {
    return null;
  }

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
        Sea Battle: Battle Royal
      </h1>

      <div className='p-5'>
        <SoundControl />
      </div>

      {gameState.room.status !== BattleRoyalRoomStatus.FINISHED &&
        selectedEvent && (
          <BattleRoyalUpgradeDialog
            open={openEventDialog}
            onOpenChange={setOpenEventDialog}
            upgradeData={selectedEvent}
            currentSlots={gameState.myPlayer.upgradeSlots}
            onSelectSlot={handleSetBonus}
          />
        )}

      {battleRoyalGameData ? (
        <div className='flex w-full items-center justify-center'>
          <div className='w-full'>
            <BattleRoyalBoard gameState={gameState} onMove={handleMove} />
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
