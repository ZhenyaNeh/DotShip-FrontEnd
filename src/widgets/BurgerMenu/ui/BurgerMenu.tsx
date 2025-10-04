import {
  ChartColumn,
  GalleryVerticalEnd,
  Hamburger,
  Handshake,
  UserRound,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import logoDark from 'public/logo-ship-dark-opacity.svg';
import logoLight from 'public/logo-ship-light-opacity.svg';
import React, { FC } from 'react';

import { ThemeToggleBurger } from '../../ThemeToggle';

import { Button } from '@/src/shared/ui/Button/Button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/src/shared/ui/Sheet/Sheet';

const NAV_ITEMS = [
  { href: '/games-catalog', icon: GalleryVerticalEnd, label: 'Games catalog' },
  { href: '/friends', icon: Handshake, label: 'Friends' },
  { href: '/statistics', icon: ChartColumn, label: 'Statistics' },
] as const;

const LOGO_IMAGE_PROPS = {
  width: 0,
  height: 0,
  sizes: '100vw' as const,
  className: 'h-auto w-full',
  priority: true,
};

export const BurgerMenu: FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon'>
          <Hamburger className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all' />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {' '}
            <Link href='/'>
              <div className='hidden w-[120px] dark:block'>
                <Image
                  src={logoDark}
                  alt='Next.js logo'
                  {...LOGO_IMAGE_PROPS}
                />
              </div>
              <div className='relative block w-[120px] dark:hidden'>
                <Image
                  src={logoLight}
                  alt='Next.js logo'
                  {...LOGO_IMAGE_PROPS}
                />
              </div>
            </Link>
          </SheetTitle>
          <SheetDescription>Navigation</SheetDescription>
        </SheetHeader>
        <div className='grid flex-1 auto-rows-min gap-12 px-4'>
          <div className='grid gap-3'>
            <Button className='flex justify-start'>
              <UserRound />
              <Link href='/games-catalog' className='link-hover'>
                Profile
              </Link>
            </Button>
          </div>
          <div className='grid gap-3'>
            {NAV_ITEMS.map(item => (
              <React.Fragment key={item.href}>
                <Button className='flex justify-start'>
                  <item.icon />
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              </React.Fragment>
            ))}
          </div>

          {/* <div className='grid gap-3'>
            <Button className='flex justify-start'>
              <UserRound />
              <Link href='/games-catalog' className='link-hover'>
                Profile
              </Link>
            </Button>
          </div> */}
        </div>
        <SheetFooter>
          <ThemeToggleBurger />
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
