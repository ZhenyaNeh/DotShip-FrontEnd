'use client';

import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import logoDark from 'public/logo-ship-dark-opacity.svg';
import logoLight from 'public/logo-ship-light-opacity.svg';
import React, { ComponentProps, FC, memo } from 'react';

import { BurgerMenu } from '../../BurgerMenu';
import { AUTH_ITEM, LINK_SHADOW, LOGO_IMAGE_PROPS, NAV_ITEMS } from '../const';

import { AvatarLink } from './AvatarLink';
import { useProfile } from '@/src/shared/hooks';
import { cn } from '@/src/shared/lib/clsx';
import { Separator } from '@/src/shared/ui/Separator/Separator';
import { ThemeToggle } from '@/src/widgets/ThemeToggle';

export const Header: FC<ComponentProps<'header'>> = memo(props => {
  const { className, ...otherProps } = props;

  const { user, isLoading } = useProfile();

  return (
    <header
      className={cn(
        'fixed z-30 flex w-full flex-wrap items-center justify-center backdrop-blur',
        className
      )}
      {...otherProps}
    >
      <div className='container mx-auto flex max-w-7xl justify-between p-3 py-5 backdrop-blur'>
        {/* Logo */}
        <div className='flex flex-1 items-center justify-start'>
          <Link href='/'>
            <div className='hidden w-[160px] dark:block'>
              <Image src={logoDark} alt='Next.js logo' {...LOGO_IMAGE_PROPS} />
            </div>
            <div className='relative block w-[160px] dark:hidden'>
              <Image src={logoLight} alt='Next.js logo' {...LOGO_IMAGE_PROPS} />
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className='flex flex-3 items-center justify-center max-sm:hidden'>
          {NAV_ITEMS.map((item, index) => (
            <React.Fragment key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'text-primary link-hover py-1 font-bold',
                  LINK_SHADOW
                )}
              >
                {item.label}
              </Link>
              {index < NAV_ITEMS.length - 1 && (
                <Separator className='mx-5' orientation='vertical' />
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Auth & Theme Toggle */}
        <div className='flex flex-1 items-center justify-end max-sm:hidden'>
          {/* {!isLoading ? ( */}
          {user ? (
            <AvatarLink displayName={user.displayName} imgSrc={user.picture} />
          ) : (
            <Link
              href={AUTH_ITEM.href}
              className={cn('text-primary link-hover font-bold', LINK_SHADOW)}
            >
              {AUTH_ITEM.label}
            </Link>
          )}
          {/* // ) : (
          //   <Loader2 className='animate-spin' />
          // )} */}

          <Separator className='mx-5' orientation='vertical' />
          <ThemeToggle />
        </div>

        {/* Auth & Burger menu */}
        <div className='hidden flex-1 items-center justify-end max-sm:flex'>
          {/* <Link
            href={AUTH_ITEM.href}
            className={cn('text-primary link-hover font-bold', LINK_SHADOW)}
          >
            {AUTH_ITEM.label}
          </Link> */}
          {!isLoading ? (
            user ? (
              <AvatarLink
                displayName={user.displayName}
                imgSrc={user.picture}
              />
            ) : (
              <Link
                href={AUTH_ITEM.href}
                className={cn('text-primary link-hover font-bold', LINK_SHADOW)}
              >
                {AUTH_ITEM.label}
              </Link>
            )
          ) : (
            <Loader2 className='animate-spin' />
          )}
          <Separator className='mx-5' orientation='vertical' />
          <BurgerMenu></BurgerMenu>
        </div>
      </div>

      {/* Separator */}
      <div className='flex w-full items-center justify-center'>
        <Separator className='container max-w-7xl' orientation='horizontal' />
      </div>
    </header>
  );
});

Header.displayName = 'Header';
