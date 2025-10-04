import React, { FC } from 'react';

import { ShipComponentTypes, ShipType } from '../model/types/shipTypes';

import { GameShip } from './variants/GameShip';
import { PlacementShip } from './variants/PlacementShip';

interface Props {
  type: ShipComponentTypes;
  ship: ShipType;
}

const componentMap = {
  [ShipComponentTypes.PLACEMENT]: PlacementShip,
  [ShipComponentTypes.GAME]: GameShip,
};

export const Ship: FC<Props> = ({ type, ship }) => {
  const Component = componentMap[type] || PlacementShip;
  return <Component ship={ship}></Component>;
};
