'use client';

import { DndContext, MouseSensor, TouchSensor, useSensor } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { FC, Suspense } from 'react';

import { MatchmakingProvider } from '@/src/app/providers/MatchmakingProvider';
import { Board, BoardComponentTypes } from '@/src/features/Board';
import { PlacementPanel } from '@/src/features/PlacementPanel/ui/PlacementPanel';
import { ShipDock } from '@/src/features/ShipDock/ui/ShipDock';
import { useGames, usePlacement } from '@/src/shared/hooks';
import { GameMode } from '@/src/shared/lib/types';
import { BattleRoyalStart } from '@/src/widgets/BattleRoyalStart';

const PlacementPage: FC = () => {
  const {
    handleDragEnd,
    handleDragOver,
    handleDragCancel,
    handleDragAbort,
    customCollisionDetection,
  } = usePlacement();
  const { games } = useGames();
  const searchParams = useSearchParams();
  const gameId = searchParams.get('gameId');
  const game = games?.find(game => game.id === gameId);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 10,
      tolerance: 5,
    },
  });

  return (
    <Suspense fallback={<Loader2 className='animate-spin' />}>
      <MatchmakingProvider>
        {game?.gameMode === GameMode.BATTLE_ROYAL ? (
          <BattleRoyalStart game={game} />
        ) : (
          <DndContext
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
            onDragAbort={handleDragAbort}
            sensors={[mouseSensor, touchSensor]}
            modifiers={[restrictToWindowEdges]}
            collisionDetection={customCollisionDetection}
          >
            <div
              id='main-container'
              className='flex w-full flex-wrap items-center justify-center'
            >
              <h1 className='text-2x mb-10 w-full text-center text-3xl font-bold'>
                Arrange the ships
              </h1>
              <div className='items-top flex w-full flex-wrap justify-between'>
                <ShipDock />
                <Board type={BoardComponentTypes.PLACEMENT} />
                <PlacementPanel />
              </div>
            </div>
          </DndContext>
        )}
      </MatchmakingProvider>
    </Suspense>
  );
};

export default PlacementPage;
