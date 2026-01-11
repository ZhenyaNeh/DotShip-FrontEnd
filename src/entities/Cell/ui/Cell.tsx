import { CellComponentTypes } from '..';
import { FC, PropsWithChildren } from 'react';

import { GameCell } from './variants/GameCell';
import { PlacementCell } from './variants/PlacementCell';
import { SymbolCell } from './variants/SymbolCell';
import { MoveType, ShipType } from '@/src/shared/lib/types';

interface Props {
  id: string;
  type: CellComponentTypes;
  ships?: ShipType[];
  moves?: MoveType[];
  isUserBoard?: boolean;
}

const componentMap = {
  [CellComponentTypes.SYMBOL]: SymbolCell,
  [CellComponentTypes.PLACEMENT]: PlacementCell,
  [CellComponentTypes.GAME]: GameCell,
};

export const Cell: FC<PropsWithChildren<Props>> = ({
  type,
  id,
  children,
  ships,
  moves,
  isUserBoard,
}) => {
  const Component = componentMap[type] || PlacementCell;
  return (
    <Component id={id} ships={ships} moves={moves} isUserBoard={isUserBoard}>
      {children}
    </Component>
  );
};
