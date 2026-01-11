import React, { FC } from 'react';

import { getImage } from '@/src/shared/lib/get-image';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/shared/ui/Avatar/Avatar';

interface Props {
  displayName: string;
  picture: string;
}

export const FriendAvatar: FC<Props> = props => {
  const { displayName, picture } = props;

  return (
    <Avatar className='size-10'>
      <AvatarImage src={getImage(picture)} alt={displayName} />
      <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};
