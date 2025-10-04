import React, { FC, JSX, useMemo } from 'react';

import { ShipType } from '@/src/entities/Ship';
import { ShipComponentTypes } from '@/src/entities/Ship/model/types/shipTypes';
import { Ship } from '@/src/entities/Ship/ui/Ship';
import { usePlacement } from '@/src/shared/hooks/usePlacement/usePlacement';

export const ShipDock: FC = () => {
  const { ships } = usePlacement();

  const shipDock: JSX.Element[] = useMemo(() => {
    const groupedShips: Record<number, ShipType[]> = {};

    for (const ship of ships) {
      const size = ship.health;
      if (!groupedShips[size]) {
        groupedShips[size] = [];
      }
      groupedShips[size].push(ship);
    }

    return Object.entries(groupedShips)
      .sort(([a], [b]) => Number(b) - Number(a)) // Сортируем от большего к меньшему
      .map(([size, shipsGroup]) => (
        <div key={size} className='flex'>
          {shipsGroup.map((ship, index) =>
            ship.cords.x < 0 || ship.cords.y < 0 ? (
              <div key={`${size}-${index}`} className='p-[8px] max-sm:p-[5px]'>
                <Ship type={ShipComponentTypes.PLACEMENT} ship={ship} />
              </div>
            ) : null
          )}
        </div>
      ));
  }, [ships]);

  return (
    <div className='border-border m-3 h-full w-full flex-1 items-center justify-center rounded-lg border p-[15px]'>
      <h2 className='text-center text-2xl font-bold'>
        Drag the ships onto the board
      </h2>
      <div className=''>
        <div>{shipDock}</div>
      </div>
      <h2 className='text-border text-center'>To rotate click on the ship</h2>
    </div>
  );
};
