import { ShipType } from '@/src/entities/Ship';
import { ShipComponentTypes } from '@/src/entities/Ship/model/types/shipTypes';
import { Ship } from '@/src/entities/Ship/ui/Ship';
import { usePlacement } from '@/src/shared/hooks/usePlacement/usePlacement';
import React, { FC, JSX, useMemo } from 'react';

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
    <div className='h-full w-full flex-1 justify-center items-center border border-border rounded-lg p-[15px] m-3'>
      <h2 className='text-center font-bold text-2xl'>
        Drag the ships onto the board
      </h2>
      <div className=''>
        <div>{shipDock}</div>
      </div>
      <h2 className='text-center text-border'>To rotate click on the ship</h2>
    </div>
  );
};
