import { FC } from 'react';
import { BoardComponentTypes } from '../model/types/boardTypes';
import { PlacementBoard } from './variants/PlacementBoard';
import { GameBoard } from './variants/GameBoard';
import { ShipBoard } from './variants/ShipBoard';

interface Props {
  type: BoardComponentTypes;
}

const componentMap = {
  [BoardComponentTypes.PLACEMENT]: PlacementBoard,
  [BoardComponentTypes.GAME]: GameBoard,
  [BoardComponentTypes.SHIP]: ShipBoard,
};

export const Board: FC<Props> = ({ type }) => {
  const Component = componentMap[type] || PlacementBoard;
  return <Component />;
};
