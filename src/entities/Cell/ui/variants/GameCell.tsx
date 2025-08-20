import React, { FC } from 'react';

interface Props {
  id: string;
}

export const GameCell: FC<Props> = ({ id }) => {
  if (!id) return null;

  const [x, y] = id.split('-').slice(1).map(Number);

  return <div>{x + y}</div>;
};
