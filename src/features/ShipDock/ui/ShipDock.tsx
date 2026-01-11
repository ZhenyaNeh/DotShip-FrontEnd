import React, { FC, JSX, useMemo } from 'react';

import { Ship } from '@/src/entities/Ship/ui/Ship';
import { usePlacement } from '@/src/shared/hooks';
import { ShipComponentTypes, ShipType } from '@/src/shared/lib/types';

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
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([size, shipsGroup]) => (
        <div key={size} className='flex'>
          {shipsGroup.map((ship, index) =>
            ship.x < 0 || ship.y < 0 ? (
              <div
                key={`${size}-${index}`}
                className='relative z-1 p-[8px] max-sm:p-[5px]'
              >
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
      <div className='relative'>
        <div>{shipDock}</div>
      </div>
      <h2 className='text-border text-center'>To rotate click on the ship</h2>
    </div>
  );
};
