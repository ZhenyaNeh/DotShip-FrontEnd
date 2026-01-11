import { Loader2 } from 'lucide-react';
import { FC, Suspense } from 'react';

import { SignUpForm } from '@/src/features/Auth';

export const SignUpPage: FC = () => {
  return (
    <Suspense fallback={<Loader2 className='animate-spin' />}>
      <SignUpForm />
    </Suspense>
  );
};
