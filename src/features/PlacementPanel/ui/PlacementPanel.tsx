import { RefreshCcw } from 'lucide-react';
import React, { FC } from 'react';

import { usePlacement } from '@/src/shared/hooks/usePlacement/usePlacement';
import { Button } from '@/src/shared/ui/Button/Button';

export const PlacementPanel: FC = () => {
  const { getRandomShipPositions } = usePlacement();

  return (
    <div className='border-border m-3 h-full w-full flex-1 items-center justify-center rounded-lg border p-[15px]'>
      <h2 className='text-center text-2xl font-bold'>Setup start game</h2>
      <div className='mt-5 flex w-full flex-wrap items-center justify-center'>
        <div className='flex w-full items-center justify-center py-5'>
          <p className='mr-5'>Auto placement ships:</p>
          <Button onClick={getRandomShipPositions}>
            <RefreshCcw />
          </Button>
        </div>
      </div>
    </div>
  );
};
