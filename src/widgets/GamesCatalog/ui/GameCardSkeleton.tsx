import { FC } from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/src/shared/ui/Card/Card';
import { Skeleton } from '@/src/shared/ui/Skeleton/Skeleton';

export const GameCardSkeleton: FC = () => {
  return (
    <Card>
      <Skeleton className='h-48 w-full' />
      <CardHeader>
        <Skeleton className='h-6 w-3/4' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-2/3' />
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-4'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className='h-10 w-full' />
      </CardFooter>
    </Card>
  );
};
