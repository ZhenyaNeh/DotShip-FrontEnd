'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { FaGoogle, FaYandex } from 'react-icons/fa';

import { useSocialAuthMutation } from '../../hooks';

import { Button } from '@/src/shared/ui/Button/Button';

export const SocialAuth: FC = () => {
  const router = useRouter();
  const { socialAuth } = useSocialAuthMutation();

  const onClick = async (provider: 'google' | 'yandex') => {
    const response = await socialAuth(provider);

    if (response) {
      router.push(response.data.url);
    }
  };

  return (
    <div className='grid gap-6'>
      <div className='grid grid-cols-2 gap-4'>
        <Button
          onClick={() => onClick('google')}
          variant='outline'
          className='w-full'
        >
          <FaGoogle />
          Google
        </Button>
        <Button
          onClick={() => onClick('yandex')}
          variant='outline'
          className='w-full'
        >
          <FaYandex />
          Yandex
        </Button>
      </div>
      <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
        <span className='bg-card text-muted-foreground relative z-10 px-2'>
          Or continue with
        </span>
      </div>
    </div>
  );
};
