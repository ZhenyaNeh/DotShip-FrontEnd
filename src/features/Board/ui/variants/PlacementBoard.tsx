import { CellComponentTypes } from '@/src/entities/Cell';
import { Cell } from '@/src/entities/Cell/ui/Cell';
import { getChar } from '@/src/shared/lib/getCharUtils';
import React, { FC } from 'react';

export const PlacementBoard: FC = () => {
  const gridSize = 10;

  return (
    <div className='h-full w-full flex-1 justify-center items-center border border-border rounded-lg py-[15px] m-3'>
      <h2 className='text-center font-bold text-2xl'>Your Board</h2>
      <div className='flex justify-center items-center'>
        <div
          className='grid grid-cols-[repeat(12,40px)] max-sm:grid-cols-[repeat(12,25px)] gap-[3px] max-sm:gap-[2px] p-[15px]'
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
