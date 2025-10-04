'use client';

import { DndContext, MouseSensor, TouchSensor, useSensor } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import React, { FC } from 'react';

import { Board, BoardComponentTypes } from '@/src/features/Board';
import { PlacementPanel } from '@/src/features/PlacementPanel/ui/PlacementPanel';
import { ShipDock } from '@/src/features/ShipDock/ui/ShipDock';
import { usePlacement } from '@/src/shared/hooks/usePlacement/usePlacement';

const PlacementPage: FC = () => {
  const {
    handleDragEnd,
    handleDragOver,
    handleDragCancel,
    handleDragAbort,
    customCollisionDetection,
  } = usePlacement();

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
    <div>
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
    </div>
  );
};

export default PlacementPage;
