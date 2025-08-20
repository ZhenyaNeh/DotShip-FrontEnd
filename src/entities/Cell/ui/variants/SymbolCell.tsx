import React, { FC, PropsWithChildren } from 'react';

interface Props {
  id: string;
}

export const SymbolCell: FC<PropsWithChildren<Props>> = (props) => {
  const { id, children } = props;

  if (!id) return null;

  return (
    <div
      id={id}
      className='cell-style-size flex font-bold text-foreground justify-center items-center'
    >
      {children}
    </div>
  );
};
