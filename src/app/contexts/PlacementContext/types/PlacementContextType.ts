import { ShipType } from '@/src/entities/Ship';
import { CollisionDetection, DragCancelEvent, DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import { Dispatch, SetStateAction } from 'react';

export type PlacementContextType = {
  ships: ShipType[];
  setShips: Dispatch<SetStateAction<ShipType[]>>;
  handleDragEnd: (event: DragEndEvent) => void;
  handleDragOver: (event: DragOverEvent) => void;
  handleDragCancel: (event: DragCancelEvent) => void;
  customCollisionDetection: CollisionDetection;
  handleDragAbort: () => void;
  rotateShip: (ship: ShipType) => boolean;
  getRandomShipPositions: () => void;
};
