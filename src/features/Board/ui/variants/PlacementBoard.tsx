import React, { FC } from 'react';

import { CellComponentTypes } from '@/src/entities/Cell';
import { Cell } from '@/src/entities/Cell/ui/Cell';
import { getChar } from '@/src/shared/lib/getCharUtils';

export const PlacementBoard: FC = () => {
  const gridSize = 10;

  return (
    <div className='border-border bg-card m-3 h-full w-full flex-1 items-center justify-center rounded-lg border py-[15px]'>
      <h2 className='text-center text-2xl font-bold'>Your Board</h2>
      <div className='flex items-center justify-center'>
        <div className='grid grid-cols-[repeat(12,40px)] gap-[3px] p-[15px] max-sm:grid-cols-[repeat(12,25px)] max-sm:gap-[2px]'>
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
                  type={CellComponentTypes.PLACEMENT}
                  id={`cell-${x}-${y}`}
                  key={`cell-${x}-${y}`}
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
        </div>
      </div>
    </div>
  );
};
