import { FC } from 'react';

import { BoardComponentTypes } from '../model/types/boardTypes';

import { BattleRoyalBoard } from './variants/BattleRoyalBoard';
import { GameBoard } from './variants/GameBoard';
import { PlacementBoard } from './variants/PlacementBoard';
import { MoveType, ShipType, UserType } from '@/src/shared/lib/types';

interface Props {
  type: BoardComponentTypes;
  user?: UserType;
  ships?: ShipType[];
  moves?: MoveType[];
  isUserBoard?: boolean;
}

const componentMap = {
  [BoardComponentTypes.PLACEMENT]: PlacementBoard,
  [BoardComponentTypes.GAME]: GameBoard,
  [BoardComponentTypes.BATTLE_ROYAL]: BattleRoyalBoard,
};

export const Board: FC<Props> = ({ type, user, ships, moves, isUserBoard }) => {
  const Component = componentMap[type] || PlacementBoard;
  return (
    <Component
      user={user}
      ships={ships}
      moves={moves}
      isUserBoard={isUserBoard}
    />
  );
};
