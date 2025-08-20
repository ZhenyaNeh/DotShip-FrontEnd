import React, { FC } from 'react';
import { ShipComponentTypes, ShipType } from '../model/types/shipTypes';
import { PlacementShip } from './variants/PlacementShip';
import { GameShip } from './variants/GameShip';

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

