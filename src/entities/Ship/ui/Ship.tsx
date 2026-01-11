import React, { FC } from 'react';

import { GameShip } from './variants/GameShip';
import { PlacementShip } from './variants/PlacementShip';
import { ShipComponentTypes, ShipType } from '@/src/shared/lib/types';

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
