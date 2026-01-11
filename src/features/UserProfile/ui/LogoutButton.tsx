import React, { FC, HTMLAttributes } from 'react';

import { useLogoutMutation } from '../hooks';

import { cn } from '@/src/shared/lib/clsx';
import { Button } from '@/src/shared/ui/Button/Button';

export const LogoutButton: FC<HTMLAttributes<HTMLButtonElement>> = props => {
  const { className, ...otherProps } = props;

  const { logout } = useLogoutMutation();

  return (
    <Button
      className={cn(className)}
      variant='default'
      onClick={() => logout()}
      {...otherProps}
    >
      Log out
    </Button>
  );
};
