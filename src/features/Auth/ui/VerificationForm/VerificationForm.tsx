'use client';

import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { FC, useEffect } from 'react';

import { useVerificationMutation } from '../../hooks';
import { AuthWrapper } from '../AuthWrapper/AuthWrapper';

export const VerificationForm: FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const { verification } = useVerificationMutation();

  useEffect(() => {
    verification(token);
  }, [token, verification]);

  return (
    <AuthWrapper heading='Email confirmation'>
      <div>
        <Loader2 className='animate-spin' />
      </div>
    </AuthWrapper>
  );
};
