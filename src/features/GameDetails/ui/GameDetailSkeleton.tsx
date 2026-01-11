import { FC } from 'react';

import { Skeleton } from '@/src/shared/ui/Skeleton/Skeleton';

export const GameDetailSkeleton: FC = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-6 space-y-4'>
        <Skeleton className='h-8 w-48' />
        <Skeleton className='h-4 w-64' />
      </div>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
        <div className='space-y-8 lg:col-span-2'>
          <div className='space-y-4'>
            <Skeleton className='h-12 w-3/4' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-2/3' />
            <div className='flex gap-2'>
              <Skeleton className='h-6 w-20' />
              <Skeleton className='h-6 w-20' />
              <Skeleton className='h-6 w-20' />
            </div>
          </div>

          <div className='space-y-6'>
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-40 w-full' />
          </div>
        </div>

        <div className='space-y-6'>
          <div className='space-y-6 rounded-xl border p-6'>
            <Skeleton className='h-8 w-32' />
            <div className='space-y-4'>
              <Skeleton className='h-12 w-full' />
              <Skeleton className='h-12 w-full' />
              <Skeleton className='h-12 w-full' />
            </div>
            <Skeleton className='h-12 w-full' />
          </div>

          <Skeleton className='h-40 w-full rounded-xl' />
        </div>
      </div>
    </div>
  );
};
