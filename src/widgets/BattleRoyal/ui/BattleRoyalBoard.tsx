import { Target, Zap } from 'lucide-react';
import React, { FC, useMemo } from 'react';

import { BattleRoyalCell } from './BattleRoyalCell';
import { BattleRoyalPlayerInfo } from './BattleRoyalPlayerInfo';
import {
  BattleRoyalGameData,
  BattleRoyalRoomStatus,
} from '@/src/widgets/BattleRoyal/types/battle-royal-initial.types';

interface Props {
  gameState: BattleRoyalGameData;
  onMove: (x: number, y: number) => void;
}

export const BattleRoyalBoard: FC<Props> = ({ gameState, onMove }) => {
  const renderGrid = useMemo(() => {
    const calculateSafeZone = (x: number, y: number): boolean => {
      const center = gameState.room.fieldSize / 2;
      const halfSize = gameState.room.safeZoneRadius / 2;

      return (
        x >= center - halfSize &&
        x < center + halfSize &&
        y >= center - halfSize &&
        y < center + halfSize
      );
    };

    const grid = [];

    for (let y = 0; y < gameState.room.fieldSize; y++) {
      for (let x = 0; x < gameState.room.fieldSize; x++) {
        const isMyPlayer =
          gameState.myPlayer.x === x && gameState.myPlayer.y === y;
        const otherPlayer = gameState.otherPlayers.find(
          p => p.x === x && p.y === y && p.isAlive
        );
        const upgrade = gameState.upgrades.find(
          u => u.x === x && u.y === y && !u.isCollected
        );
        const isVisible = gameState.myPlayer.visibleCells.some(
          cell => cell.x === x && cell.y === y
        );
        const isSafeZone = calculateSafeZone(x, y);

        grid.push(
          <BattleRoyalCell
            key={`${x}-${y}`}
            isVisible={isVisible}
            hasMyPlayer={isMyPlayer}
            showAllInfoOnBoard={
              gameState.myPlayer.lives === 0 ||
              gameState.room.status === BattleRoyalRoomStatus.FINISHED
            }
            isMyPlayerAlive={gameState.myPlayer.lives !== 0}
            hasPlayer={!!otherPlayer}
            playerId={otherPlayer?.id}
            hasUpgrade={!!upgrade}
            upgradeType={upgrade?.upgradeType}
            isSafeZone={isSafeZone}
            isCurrentTarget={
              gameState.room.playerTurn === gameState.myPlayer.id
            }
            onClick={() => onMove(x, y)}
            isShrinking={
              gameState.room.turnNumber >= gameState.room.nextShrinkTurn - 1
            }
          />
        );
      }
    }

    return grid;
  }, [
    gameState.room.fieldSize,
    gameState.room.safeZoneRadius,
    gameState.room.status,
    gameState.room.playerTurn,
    gameState.room.turnNumber,
    gameState.room.nextShrinkTurn,
    gameState.myPlayer.x,
    gameState.myPlayer.y,
    gameState.myPlayer.visibleCells,
    gameState.myPlayer.lives,
    gameState.myPlayer.id,
    gameState.otherPlayers,
    gameState.upgrades,
    onMove,
  ]);

  return (
    <div className='flex w-full flex-wrap items-center justify-center'>
      <div className='relative mb-5 overflow-auto rounded-2xl border px-8 py-5'>
        <div className='grid grid-cols-[repeat(20,40px)] gap-[3px]'>
          {renderGrid}
        </div>
        <div className='mt-5 flex items-center gap-4'>
          <div className='flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2'>
            <Zap className='h-5 w-5 text-blue-600' />
            <span className='font-bold text-blue-700'>
              {gameState.myPlayer.remainingMoves}
            </span>
            <span className='text-sm text-blue-600'>moves</span>
          </div>

          <div className='flex items-center gap-2 rounded-full bg-red-100 px-4 py-2'>
            <Target className='h-5 w-5 text-red-600' />
            <span className='font-bold text-red-700'>
              {gameState.myPlayer.remainingAttacks}
            </span>
            <span className='text-sm text-red-600'>attack</span>
          </div>
        </div>
      </div>

      <BattleRoyalPlayerInfo gameState={gameState} />
    </div>
  );
};
