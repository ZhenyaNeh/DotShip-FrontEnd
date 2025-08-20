import React, { FC } from 'react';
import { ShipType } from '../../model/types/shipTypes';

interface Props {
  ship: ShipType;
}

export const GameShip: FC<Props> = ({ ship }) => {
  return <div>{ship.toString()}</div>;
};
