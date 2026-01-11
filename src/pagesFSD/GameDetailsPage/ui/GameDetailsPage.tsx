import { Loader2 } from 'lucide-react';
import React, { FC, Suspense } from 'react';

import { GameDetails } from '@/src/features/GameDetails';

export const GameDetailsPage: FC = () => {
  return (
    <Suspense fallback={<Loader2 className='animate-spin' />}>
      <GameDetails />
    </Suspense>
  );
};
