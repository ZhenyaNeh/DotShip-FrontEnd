import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import React, { FC } from 'react';

import { CellComponentTypes } from '@/src/entities/Cell';
import { Cell } from '@/src/entities/Cell/ui/Cell';
import { getImage } from '@/src/shared/lib/get-image';
import { getChar } from '@/src/shared/lib/getCharUtils';
import { MoveType, ShipType, UserType } from '@/src/shared/lib/types';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/shared/ui/Avatar/Avatar';

interface Props {
  user?: UserType;
  ships?: ShipType[];
  moves?: MoveType[];
  isUserBoard?: boolean;
}

export const GameBoard: FC<Props> = ({ user, ships, moves, isUserBoard }) => {
  const gridSize = 10;

  if (!user || !ships || !moves || typeof isUserBoard !== 'boolean') {
    return null;
  }

  return (
    <div className='mx-5 flex-2 items-center justify-center rounded-2xl border-[1.5px]'>
      <div className='mt-5 flex flex-col items-center justify-center'>
        <div className='flex items-center'>
          <Avatar className='size-10 font-medium'>
            <AvatarImage src={getImage(user.picture)} />
            <AvatarFallback>
              {user.displayName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h2 className='ml-3 text-2xl font-bold'>{user.displayName}</h2>
          <Trophy className='mr-2 ml-10 h-5 w-5' strokeWidth={2.8} />
          <h2 className='text-2xl font-bold'>{`${user.rating}`}</h2>
        </div>
      </div>

      <div className='flex items-center justify-center p-5'>
        <motion.div
          className='grid grid-cols-[repeat(12,40px)] gap-[3px] p-[15px] max-sm:grid-cols-[repeat(12,25px)] max-sm:gap-[2px]'
          initial='hidden'
          animate='visible'
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0,
                delayChildren: 0,
              },
            },
          }}
        >
          <Cell type={CellComponentTypes.SYMBOL} id='top-left' key='top-left' />
          {Array.from({ length: gridSize }).map((_, index) => (
            <Cell
              type={CellComponentTypes.SYMBOL}
              id={`top-${index}`}
              key={`top-${index}`}
            >
              {getChar(index)}
            </Cell>
          ))}
          <Cell
            type={CellComponentTypes.SYMBOL}
            id={'top-right'}
            key={'top-right'}
          />
          {Array.from({ length: gridSize }).map((_, x) => (
            <React.Fragment key={`row-${x}`}>
              {/* Цифра слева */}
              <Cell
                type={CellComponentTypes.SYMBOL}
                id={`left-${x}`}
                key={`left-${x}`}
              >
                {(x + 1).toString()}
              </Cell>

              {/* Ячейки игрового поля */}
              {Array.from({ length: gridSize }).map((_, y) => (
                <Cell
                  id={`cell-${x}-${y}`}
                  key={`cell-${x}-${y}`}
                  type={CellComponentTypes.GAME}
                  ships={ships}
                  moves={moves}
                  isUserBoard={isUserBoard}
                />
              ))}

              {/* Цифра справа */}
              <Cell
                type={CellComponentTypes.SYMBOL}
                id={`right-${x}`}
                key={`right-${x}`}
              >
                {(x + 1).toString()}
              </Cell>
            </React.Fragment>
          ))}
          <Cell
            type={CellComponentTypes.SYMBOL}
            id={'bottom-left'}
            key={'bottom-left'}
          />
          {Array.from({ length: gridSize }).map((_, index) => (
            <Cell
              type={CellComponentTypes.SYMBOL}
              id={`bottom-${index}`}
              key={`bottom-${index}`}
            >
              {getChar(index)}
            </Cell>
          ))}
          <Cell
            type={CellComponentTypes.SYMBOL}
            id={'bottom-right'}
            key={'bottom-right'}
          />
        </motion.div>
      </div>
    </div>
  );
};
