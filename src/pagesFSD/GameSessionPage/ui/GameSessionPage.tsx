import { Loader2 } from 'lucide-react';
import { FC, Suspense } from 'react';

import { GameSessionProvider } from '@/src/app/providers/GameSessionProvider';
import { GameSession } from '@/src/widgets/GameSession';

export const GameSessionPage: FC = () => {
  return (
    <Suspense fallback={<Loader2 className='animate-spin' />}>
      <GameSessionProvider>
        <GameSession />
      </GameSessionProvider>
    </Suspense>
  );
};
