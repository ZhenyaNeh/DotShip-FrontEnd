'use client';

import React, { FC, PropsWithChildren, useState, useEffect } from 'react';
import { ShipType } from '../../model/types/shipTypes';
import { getVariant, shipVariants } from '../../lib/shipVariants';
import { cn } from '@/src/shared/lib/utils';
import { useDraggable } from '@dnd-kit/core';
import { motion, useAnimation, useMotionValue, useSpring } from 'framer-motion';
import { usePlacement } from '@/src/shared/hooks/usePlacement/usePlacement';

interface Props {
  ship: ShipType;
}

export const PlacementShip: FC<PropsWithChildren<Props>> = (props) => {
  const { ship, children } = props;
  const [isDragging, setIsDragging] = useState(false);
  const controls = useAnimation();
  const { rotateShip } = usePlacement();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 500, damping: 20 });
  const springY = useSpring(y, { stiffness: 500, damping: 20 });

  const { attributes, listeners, setNodeRef, transform } = useDraggable(
    { id: ship.id }
  );

  const handleClickEvent = () => {
    if (!rotateShip(ship)) {
      controls.start({
        x: [0, 10, -10, 8, -8, 0],
        backgroundColor: [
          'var(--foreground)',
          'var(--destructive)',
          'var(--foreground)',
        ],
        transition: {
          x: { duration: 0.6, ease: 'easeInOut' },
          backgroundColor: { duration: 0.7, times: [0, 0.2, 1] },
        },
      });
    }
  };

  useEffect(() => {
    if (transform) {
      x.set(transform.x);
      y.set(transform.y);
      setIsDragging(true);
    } else if (isDragging) {
      x.set(0);
      y.set(0);
      setIsDragging(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transform, isDragging]);

  return (
    <motion.div
      ref={setNodeRef}
      style={{
        x: springX,
        y: springY,
      }}
      {...listeners}
      {...attributes}
      className={cn(
        shipVariants({ variant: getVariant(ship) }),
        'bg-foreground',
        isDragging ? 'outline-0 opacity-50 z-[-10px]' : 'outline-1 opacity-100'
      )}
      onClick={handleClickEvent}
      whileHover={{ scale: 1.05, outline: 'none' }}
      transition={{ type: 'spring', bounce: 0.3 }}
      aria-describedby={`DndDescribedBy-${ship.id}`}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};
