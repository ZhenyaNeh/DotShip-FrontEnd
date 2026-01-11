'use client';

import { Loader2 } from 'lucide-react';
import React, { FC, Suspense } from 'react';

import { FriendTabs } from '@/src/features/FriendTabs';
import { useProfile } from '@/src/shared/hooks';

export const FriendsPage: FC = () => {
  const { user } = useProfile();

  if (!user) {
    return null;
  }

  return (
    <Suspense fallback={<Loader2 className='animate-spin' />}>
      <div className='flex min-h-[40vh] w-full items-center justify-center'>
        <FriendTabs userId={user.id} />
      </div>
    </Suspense>
  );
};
