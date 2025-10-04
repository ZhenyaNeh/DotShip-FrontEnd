import { useDroppable } from '@dnd-kit/core';
import React, { FC } from 'react';

import { ShipType } from '@/src/entities/Ship';
import { ShipComponentTypes } from '@/src/entities/Ship/model/types/shipTypes';
import { Ship } from '@/src/entities/Ship/ui/Ship';
import { usePlacement } from '@/src/shared/hooks/usePlacement/usePlacement';

interface Props {
  id: string;
}

export const PlacementCell: FC<Props> = props => {
  const { id } = props;
  const { ships } = usePlacement();
  const { setNodeRef } = useDroppable({ id: id });
  const [x, y] = id?.split('-').slice(1).map(Number);
  const shipInCell: ShipType | null =
    ships.find(ship => ship.cords.x === x && ship.cords.y === y) || null;

  return (
    <div
      id={id}
      data-id={id}
      ref={setNodeRef}
      className={`cell-class cell-style-size border-foreground block rounded-lg border max-sm:rounded-md`}
    >
      {shipInCell ? (
        <Ship type={ShipComponentTypes.PLACEMENT} ship={shipInCell} />
      ) : null}
    </div>
  );
};
