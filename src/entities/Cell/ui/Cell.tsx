import { FC, PropsWithChildren } from 'react';

import { CellComponentTypes } from '../model/types/cellTypes';

import { GameCell } from './variants/GameCell';
import { PlacementCell } from './variants/PlacementCell';
import { SymbolCell } from './variants/SymbolCell';

interface Props {
  type: CellComponentTypes;
  id: string;
}

const componentMap = {
  [CellComponentTypes.SYMBOL]: SymbolCell,
  [CellComponentTypes.PLACEMENT]: PlacementCell,
  [CellComponentTypes.GAME]: GameCell,
};

export const Cell: FC<PropsWithChildren<Props>> = ({ type, id, children }) => {
  const Component = componentMap[type] || PlacementCell;
  return <Component id={id}>{children}</Component>;
};
