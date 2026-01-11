import React, { FC } from 'react';

import { Skeleton } from '@/src/shared/ui/Skeleton/Skeleton';

export const ProfileSkeleton: FC = () => {
  return (
    <div className='flex w-full flex-wrap items-center justify-center'>
      <div className='mb-10 flex w-full flex-wrap items-center justify-start'>
        <div className='flex w-full items-start justify-start'>
          <div className='relative size-30'>
            <Skeleton className='h-full w-full rounded-full' />
          </div>

          <div className='ml-10 flex h-full flex-col items-start justify-start space-y-4'>
            <Skeleton className='h-10 w-64' />
            <Skeleton className='h-5 w-48' />
            <div className='flex items-center space-x-2'>
              <Skeleton className='h-8 w-16' />
              <Skeleton className='h-8 w-12' />
              <Skeleton className='h-8 w-8 rounded-full' />
            </div>
          </div>

          <div className='ml-10 flex h-full flex-col items-start justify-start'>
            <Skeleton className='h-10 w-32' />
          </div>
        </div>
      </div>
    </div>
  );
};
