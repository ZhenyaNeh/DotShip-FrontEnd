import React, { ComponentProps, FC } from 'react';
import { cn } from '@/src/shared/lib/utils';
import { Separator } from '@/src/shared/ui/Separator/Separator';
import Link from 'next/link';
import { ThemeToggle } from '@/src/widgets/ThemeToggle';

export const Header: FC<ComponentProps<'header'>> = (props) => {
  const { className, ...otherProps } = props;

  return (
    <header
      className={cn(
        'w-full flex justify-center items-center flex-wrap fixed backdrop-blur z-30',
        className
      )}
      {...otherProps}
    >
      <div className='container max-w-7xl mx-auto flex justify-between p-3 py-5 backdrop-blur'>
        <div className='flex-1 flex justify-start items-center'>
          <Link href='/' className='text-2xl text-primary font-bold link-hover'>
            Sea-Battle Game
          </Link>
        </div>
        <div className='flex-3 flex justify-center items-center'>
          <Link
            href='/games-catalog'
            className='text-primary font-bold py-1 link-hover'
          >
            Games catalog
          </Link>

          <div className='mx-5 h-[90%] border-r-[1.5px] border-zinc-400' />
          <Link
            href='/friends'
            className='text-primary font-bold py-1 link-hover'
          >
            Friends
          </Link>
          <div className='mx-5 h-[90%] border-r-[1.5px] border-zinc-400' />
          <Link
            href='/statistics'
            className='text-primary font-bold py-1 link-hover'
          >
            Statistics
          </Link>
        </div>
        <div className='flex-1 flex justify-end items-center'>
          <Link href='/auth' className='text-primary font-bold link-hover'>
            Sign in
          </Link>
          <div className='mx-5 h-[90%] border-r-[1.5px] border-zinc-400' />
          <ThemeToggle />
        </div>
      </div>
      <div className='w-full flex justify-center items-center'>
        <Separator
          className='container max-w-7xl bg-zinc-400'
          orientation='horizontal'
        />
      </div>
    </header>
  );
};
