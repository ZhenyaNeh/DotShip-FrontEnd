// import { motion } from 'framer-motion';
import React, { FC, PropsWithChildren } from 'react';

import { getVariant, shipVariants } from '../../lib/shipVariants';

import { cn } from '@/src/shared/lib/clsx';
import { ShipType } from '@/src/shared/lib/types';

interface Props {
  ship: ShipType;
}

export const GameShip: FC<PropsWithChildren<Props>> = ({ children, ship }) => {
  return (
    <div
      className={cn(
        shipVariants({ variant: getVariant(ship) }),
        'bg-foreground absolute'
      )}
      // whileHover={{ scale: 1.05 }}
      // aria-describedby={`DndDescribedBy-${ship.id}`}
    >
      {children}
    </div>
  );
};
