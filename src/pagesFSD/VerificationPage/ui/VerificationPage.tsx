import { Loader2 } from 'lucide-react';
import { FC, Suspense } from 'react';

import { VerificationForm } from '@/src/features/Auth';

export const VerificationPage: FC = () => {
  return (
    <Suspense fallback={<Loader2 className='animate-spin' />}>
      <VerificationForm />
    </Suspense>
  );
};
