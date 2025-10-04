import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

import { SocialAuth } from '../SocialAuth/SocialAuth';

import { Button } from '@/src/shared/ui/Button/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/shared/ui/Card/Card';

interface Props {
  heading: string;
  description?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  isShowSocialAuth?: boolean;
}

export const AuthWrapper: FC<PropsWithChildren<Props>> = props => {
  const {
    children,
    heading,
    description,
    backButtonLabel,
    backButtonHref,
    isShowSocialAuth = false,
  } = props;

  return (
    <Card className='w-[400px]'>
      <CardHeader className='space-y-2 text-center'>
        <CardTitle className='text-2xl font-bold'>{heading}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {isShowSocialAuth && <SocialAuth />}
        {children}
      </CardContent>
      <CardFooter>
        {backButtonLabel && backButtonHref && (
          <Button variant='link' className='w-full'>
            <Link href={backButtonHref}>{backButtonLabel}</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
