import { Loader2 } from 'lucide-react';
import { FC, Suspense } from 'react';

import { BattleRoyal } from '@/src/widgets/BattleRoyal';

export const BattleRoyalPage: FC = () => {
  return (
    <Suspense fallback={<Loader2 className='animate-spin' />}>
      <BattleRoyal />;
    </Suspense>
  );
};
