'use client';

import {
  CollisionDetection,
  DragCancelEvent,
  DragEndEvent,
  DragOverEvent,
  rectIntersection,
} from '@dnd-kit/core';
import { FC, PropsWithChildren, useCallback, useState } from 'react';

import { PlacementContext } from '@/src/app/contexts/PlacementContext';
import { getStartupShips } from '@/src/shared/const/shipsStartupConst';
import {
  canPlaceShip,
  canRotate,
  getNormalizedCords,
  placeShipsRandomly,
} from '@/src/shared/lib/placementUtils';
import { ShipCordType, ShipType } from '@/src/shared/lib/types';

export const PlacementProvider: FC<PropsWithChildren> = ({ children }) => {
  const [ships, setShips] = useState<ShipType[]>(getStartupShips());
  const [highlights, setHighlights] = useState<ShipCordType | null>(null);

  const setHighlightCells = useCallback(({ x, y, w, h }: ShipCordType) => {
    for (let startX = x; startX <= x + h; startX++) {
      for (let startY = y; startY <= y + w; startY++) {
        const cell = document.querySelector(
          `.cell-class[data-id="cell-${startX}-${startY}"]`
        ) as HTMLElement | null;
        if (cell) cell.style.backgroundColor = 'var(--muted)';
      }
    }
    setHighlights({ x: x, y: y, w, h });
  }, []);

  const resetHighlights = useCallback(() => {
    if (highlights) {
      const { x, y, w, h } = highlights;
      for (let startX = x; startX <= x + h; startX++) {
        for (let startY = y; startY <= y + w; startY++) {
          const cellElem = document.querySelector(
            `.cell-class[data-id="cell-${startX}-${startY}"]`
          ) as HTMLElement | null;
          if (cellElem) cellElem.style.backgroundColor = '';
        }
      }
      setHighlights(null);
    }
  }, [highlights]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      resetHighlights();
      const { active, over } = event;

      if (!over || !ships) return null;

      const shipId = active.id as number;
      const newCell = over.id as string;
      const [x, y] = newCell?.split('-').slice(1).map(Number);
      const currentShip = structuredClone(ships.find(s => s.id === shipId));

      if (!currentShip) return;

      const currentNormalizedShip = getNormalizedCords({
        ...currentShip,
        x,
        y,
      });

      if (canPlaceShip(ships, currentNormalizedShip)) {
        setShips(() =>
          ships.map(ship => (ship.id === shipId ? currentNormalizedShip : ship))
        );
      }
    },
    [resetHighlights, ships]
  );

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      resetHighlights();

      const { active, over } = event;

      if (!active || !over) return;

      const shipId = active.id as number;
      const cellId = over.id as string;
      const [x, y] = cellId?.split('-').slice(1).map(Number);
      const ship = structuredClone(ships.find(s => s.id === shipId));

      if (!ship) return;

      const normalizedShip = getNormalizedCords({ ...ship, x, y });

      if (canPlaceShip(ships, normalizedShip)) {
        setHighlightCells(normalizedShip);
      }
    },
    [resetHighlights, setHighlightCells, ships]
  );

  const handleDragCancel = useCallback(
    (event: DragCancelEvent) => {
      resetHighlights();
      const { active, over } = event;
      if (!active || !over) return;
    },
    [resetHighlights]
  );

  const handleDragAbort = useCallback(() => {
    resetHighlights();
  }, [resetHighlights]);

  const customCollisionDetection: CollisionDetection = args => {
    const { collisionRect, active } = args;
    if (!collisionRect || !active) return [];

    const shipId = active.id as number;
    const currentShip = structuredClone(ships.find(s => s.id === shipId));

    if (!currentShip) return [];
    const offsetSetup = window.innerWidth >= 640 ? -25 : -15;

    const offsetX = currentShip.w < currentShip.h ? offsetSetup : 0;
    const offsetY = currentShip.w < currentShip.h ? 0 : offsetSetup;

    const adjustedCollisionRect = {
      top: collisionRect.top + offsetX,
      bottom: collisionRect.bottom + offsetX,
      left: collisionRect.left + offsetY,
      right: collisionRect.right + offsetY,
      width: collisionRect.width,
      height: collisionRect.height,
    };

    return rectIntersection({
      ...args,
      collisionRect: adjustedCollisionRect,
    });
  };

  const rotateShip = useCallback(
    (ship: ShipType): boolean => {
      if (ship.health === 1) return true;

      if (!canRotate(ships, ship)) return false;

      setShips(prevShips =>
        prevShips.map(s =>
          s.id === ship.id
            ? {
                ...s,
                x: s.x,
                y: s.y,
                w: s.h,
                h: s.w,
              }
            : s
        )
      );

      return true;
    },
    [ships]
  );

  const getRandomShipPositions = useCallback(() => {
    const randomShipsPositions = placeShipsRandomly(getStartupShips());
    setShips(randomShipsPositions);
  }, []);

  return (
    <PlacementContext.Provider
      value={{
        ships,
        setShips,
        handleDragEnd,
        handleDragOver,
        handleDragCancel,
        handleDragAbort,
        customCollisionDetection,
        rotateShip,
        getRandomShipPositions,
      }}
    >
      {children}
    </PlacementContext.Provider>
  );
};
