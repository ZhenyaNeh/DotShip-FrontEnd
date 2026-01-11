import { AvatarImage } from '@radix-ui/react-avatar';
import Link from 'next/link';
import React, { FC } from 'react';

import { LINK_SHADOW } from '../const';

import { cn } from '@/src/shared/lib/clsx';
import { getImage } from '@/src/shared/lib/get-image';
import { Avatar, AvatarFallback } from '@/src/shared/ui/Avatar/Avatar';

interface Props {
  displayName: string;
  imgSrc: string;
}

export const AvatarLink: FC<Props> = props => {
  const { displayName, imgSrc } = props;

  return (
    <div>
      <Link
        href='/profile'
        className='text-primary link-hover flex items-center justify-center py-1 font-bold'
      >
        <Avatar className='size-10'>
          <AvatarImage src={getImage(imgSrc)} />
          <AvatarFallback className='text-primary'>
            {displayName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h2 className={cn('ml-2', LINK_SHADOW)}>{displayName}</h2>
      </Link>
    </div>
  );
};
