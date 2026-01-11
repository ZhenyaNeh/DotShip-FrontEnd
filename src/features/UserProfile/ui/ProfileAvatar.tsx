import React, { FC } from 'react';

import { getImage } from '@/src/shared/lib/get-image';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/shared/ui/Avatar/Avatar';

interface Props {
  imgSrc: string | undefined;
  displayName: string | undefined;
}

export const ProfileAvatar: FC<Props> = ({ imgSrc, displayName }) => {
  if (!displayName) {
    return null;
  }

  return (
    <Avatar className='size-30 text-5xl'>
      <AvatarImage
        className='transition-opacity duration-400 group-hover:opacity-50'
        src={getImage(imgSrc)}
      />
      <AvatarFallback className='transition-opacity duration-400 group-hover:opacity-50'>
        {displayName.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
