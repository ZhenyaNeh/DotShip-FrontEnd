import { Loader2 } from 'lucide-react';
import React, { FC, Suspense } from 'react';

import { GamesCatalog } from '@/src/widgets/GamesCatalog';

export const GamesCatalogPage: FC = () => {
  return (
    <Suspense fallback={<Loader2 className='animate-spin' />}>
      <GamesCatalog />
    </Suspense>
  );
};
