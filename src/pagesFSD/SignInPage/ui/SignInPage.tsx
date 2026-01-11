import { Loader2 } from 'lucide-react';
import { FC, Suspense } from 'react';

import { SignInForm } from '@/src/features/Auth';

export const SignInPage: FC = () => {
  return (
    <Suspense fallback={<Loader2 className='animate-spin' />}>
      <SignInForm />
    </Suspense>
  );
};
