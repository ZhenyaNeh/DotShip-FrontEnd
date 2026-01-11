import { Loader2 } from 'lucide-react';
import { FC, Suspense } from 'react';

import { ResetPasswordForm } from '@/src/features/Auth';

export const ResetPasswordPage: FC = () => {
  return (
    <Suspense fallback={<Loader2 className='animate-spin' />}>
      <ResetPasswordForm />
    </Suspense>
  );
};
