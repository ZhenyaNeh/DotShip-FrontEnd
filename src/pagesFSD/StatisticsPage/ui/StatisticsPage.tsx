'use client';

import { Loader2 } from 'lucide-react';
import React, { FC, Suspense } from 'react';

import { StatisticsTabs } from '@/src/features/StatisticsTabs';
import { useProfile } from '@/src/shared/hooks';

export const StatisticsPage: FC = () => {
  const { user } = useProfile();

  if (!user) {
    return null;
  }
  return (
    <Suspense fallback={<Loader2 className='animate-spin' />}>
      <div className='flex min-h-[40vh] w-full items-center justify-center'>
        <StatisticsTabs userId={user.id} />
      </div>
    </Suspense>
  );
};
