'use client';

import React, { FC } from 'react';

import { ProfileSkeleton } from './ProfileSkeleton';
import { AdminStatisticsTabs } from '@/src/features/AdminStatisticsTabs';
import { UserRole } from '@/src/features/Auth/types';
import { FriendTabs } from '@/src/features/FriendTabs';
import { StatisticsTabs } from '@/src/features/StatisticsTabs';
import {
  ImageCrop,
  LogoutButton,
  ProfileInfo,
  ProfileSettings,
} from '@/src/features/UserProfile';
import { useProfile } from '@/src/shared/hooks';

export const Profile: FC = () => {
  const { user, isLoading } = useProfile();

  if (!user) {
    return <ProfileSkeleton />;
  }

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className='flex min-h-[50vh] w-full flex-wrap items-center justify-center'>
      <div className='mb-10 flex w-full flex-wrap items-center justify-start'>
        <div className='flex w-full items-start justify-start'>
          <ImageCrop
            imgSrc={user?.picture || ''}
            displayName={user?.displayName || ''}
          />

          <ProfileInfo
            displayName={user?.displayName}
            email={user?.email}
            rating={user?.rating}
            className='ml-10'
          />

          <div className='ml-10 flex h-full flex-col items-start justify-start'>
            <LogoutButton className='mt-3' />
            <ProfileSettings user={user} />
          </div>
        </div>
      </div>
      <div className='w-full space-y-10'>
        <FriendTabs userId={user.id} />
        <StatisticsTabs userId={user.id} />
        {user.role === UserRole.Admin && <AdminStatisticsTabs />}
      </div>
    </div>
  );
};
