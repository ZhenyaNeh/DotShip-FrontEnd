import { motion } from 'framer-motion';
import { Dot, X } from 'lucide-react';
import React, { FC } from 'react';
import { toast } from 'sonner';

import { Ship } from '@/src/entities/Ship/ui/Ship';
import { useGameSession } from '@/src/shared/hooks/useGameSession/useGameSession';
import { MoveType, ShipComponentTypes, ShipType } from '@/src/shared/lib/types';
import { MoveResult } from '@/src/widgets/GameSession/types/initial-game-state.types';

interface Props {
  id: string;
  ships?: ShipType[];
  moves?: MoveType[];
  isUserBoard?: boolean;
}

export const GameCell: FC<Props> = ({ id, ships, moves, isUserBoard }) => {
  const { handleFire } = useGameSession();

  if (!id) return null;

  const [x, y] = id.split('-').slice(1).map(Number);

  const shipInCell: ShipType | null =
    ships?.find(ship => ship.x === x && ship.y === y) || null;

  const hitInCell: MoveType | null =
    moves?.find(cords => cords.x === x && cords.y === y) || null;

  const handleFireEvent = () => {
    if (isUserBoard) {
      toast.info("This is your board, you can't shoot at it.");
      return;
    }
    handleFire(x, y);
  };

  const isMiss = hitInCell?.result === MoveResult.MISS;
  const isHit =
    hitInCell?.result === MoveResult.HIT ||
    hitInCell?.result === MoveResult.SUNK;

  return (
    <motion.div
      data-id={id}
      onClick={handleFireEvent}
      whileHover={!isUserBoard ? { scale: 1.05 } : {}}
      className={`${
        !isUserBoard && 'cell-highlight'
      } border-foreground cell-class cell-style-size relative flex items-center justify-center rounded-lg border max-sm:rounded-md ${isHit ? 'bg-foreground' : ''}`}
    >
      {shipInCell && (
        <div className='absolute inset-0 z-1'>
          <Ship type={ShipComponentTypes.GAME} ship={shipInCell} />
        </div>
      )}

      {isMiss && <Dot className='stroke-border h-full w-full' />}

      {isHit && (
        <X className='relative z-2 h-3/4 w-3/4 stroke-red-600 stroke-[3]' />
      )}
    </motion.div>
  );
};
