import { useDroppable } from '@dnd-kit/core';
import React, { FC } from 'react';

import { Ship } from '@/src/entities/Ship/ui/Ship';
import { usePlacement } from '@/src/shared/hooks';
import { ShipComponentTypes, ShipType } from '@/src/shared/lib/types';

interface Props {
  id: string;
}

export const PlacementCell: FC<Props> = props => {
  const { id } = props;
  const { ships } = usePlacement();
  const { setNodeRef } = useDroppable({ id: id });
  const [x, y] = id?.split('-').slice(1).map(Number);
  const shipInCell: ShipType | null =
    ships.find(ship => ship.x === x && ship.y === y) || null;

  return (
    <div
      id={id}
      data-id={id}
      ref={setNodeRef}
      className={`cell-class cell-style-size border-foreground bg-background relative block rounded-lg border max-sm:rounded-md ${shipInCell && 'z-1'}`}
    >
      {shipInCell ? (
        <Ship type={ShipComponentTypes.PLACEMENT} ship={shipInCell} />
      ) : null}
    </div>
  );
};
