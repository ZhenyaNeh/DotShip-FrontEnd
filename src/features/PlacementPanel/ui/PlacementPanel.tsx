import { usePlacement } from '@/src/shared/hooks/usePlacement/usePlacement';
import { Button } from '@/src/shared/ui/Button/Button';
import { RefreshCcw } from 'lucide-react';
import React, { FC } from 'react'

export const PlacementPanel:FC = () => {
  const {getRandomShipPositions} = usePlacement();

   return (
    <div className="h-full w-full flex-1 justify-center items-center border border-border rounded-lg p-[15px] m-3">
      <h2 className="text-center font-bold text-2xl">Setup start game</h2>
      <div className="flex w-full justify-center items-center mt-5 flex-wrap">
         <div className="w-full flex justify-center items-center py-5">
          <p className='mr-5'>Auto placement ships:</p>
          <Button onClick={getRandomShipPositions}><RefreshCcw /></Button>
        </div>
      </div>
    </div>
  );
}
