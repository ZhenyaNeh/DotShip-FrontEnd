import { Trophy } from 'lucide-react';
import { FC, HTMLAttributes } from 'react';

import { cn } from '@/src/shared/lib/clsx';

interface Props extends HTMLAttributes<HTMLDivElement> {
  displayName: string | undefined;
  email: string | undefined;
  rating: number | undefined;
}

export const ProfileInfo: FC<Props> = props => {
  const { displayName, email, rating, className, ...otherProps } = props;

  if (!displayName || !email || (!rating && rating !== 0)) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex h-full flex-col items-start justify-start',
        className
      )}
      {...otherProps}
    >
      <h2 className='text-primary text-4xl font-bold'>{displayName}</h2>
      <h2 className='text-1xl text-muted-foreground'>{email}</h2>
      <h2 className='text-primary mt-5 flex items-center text-2xl font-bold'>
        <p>Rating:</p>
        <p className='mr-1 ml-3'>{rating}</p>
        <Trophy strokeWidth={2.8} />
      </h2>
    </div>
  );
};
