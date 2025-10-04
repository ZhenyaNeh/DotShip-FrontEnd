import Link from 'next/link';
import React, { ComponentProps, FC, memo } from 'react';
import {
  FaDiscord,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';

import { cn } from '@/src/shared/lib/clsx';
import { Separator } from '@/src/shared/ui/Separator/Separator';

// Константы для избежания повторного создания объектов
const SOCIAL_LINKS = [
  {
    href: 'https://discordapp.com/users/626637579084890142',
    icon: FaDiscord,
    label: 'Discord',
  },
  {
    href: 'https://www.youtube.com/channel/UCwNTxMcdUP1jrPBFOpTRrog',
    icon: FaYoutube,
    label: 'YouTube',
  },
  {
    href: 'https://www.instagram.com/zhenya.nehaychik?igsh=a2tyZ2J4MDVsMGJ2',
    icon: FaInstagram,
    label: 'Instagram',
  },
  {
    href: 'https://www.facebook.com/profile.php?id=100037764571500',
    icon: FaFacebook,
    label: 'Facebook',
  },
  {
    href: 'https://x.com/ZNehajcik20464?s=09',
    icon: FaTwitter,
    label: 'Twitter',
  },
] as const;

const NAV_LINKS = [
  { href: '/games-catalog', label: 'Game Catalog' },
  { href: '/friends', label: 'Friend' },
  { href: '/statistics', label: 'Statistics' },
] as const;

const FOOTER_LINKS = [
  { label: 'Site Map', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Privacy', href: '#' },
  { label: 'Disclaimer', href: '#' },
] as const;

export const Footer: FC<ComponentProps<'footer'>> = memo(props => {
  const { className, ...otherProps } = props;

  return (
    <footer
      className={cn(
        'flex h-60 w-full flex-col justify-center pt-10 backdrop-blur',
        className
      )}
      {...otherProps}
    >
      <div className='flex w-full items-center justify-center'>
        <Separator
          className='container max-w-7xl bg-zinc-400'
          orientation='horizontal'
        />
      </div>

      <div className='flex w-full flex-1 items-center justify-center'>
        <div className='container flex max-w-7xl justify-between px-3 py-5 backdrop-blur'>
          {/* Left Section - Navigation */}
          <div className='flex flex-1 flex-col items-start'>
            <Link className='link-hover mb-2 font-bold' href='/'>
              Sea Battle
            </Link>
            <nav className='flex flex-col gap-1'>
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className='link-hover text-sm'
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Section - Social Links & Contact */}
          <div className='flex flex-1 flex-col items-end gap-3'>
            {/* Social Links */}
            <div className='flex items-center gap-3'>
              {SOCIAL_LINKS.map((social, index) => (
                <React.Fragment key={social.href}>
                  <Link
                    href={social.href}
                    className='text-primary link-hover'
                    aria-label={social.label}
                  >
                    <social.icon size={25} />
                  </Link>
                  {index < SOCIAL_LINKS.length - 1 && (
                    <div className='h-6 border-r border-zinc-400' />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Contact Info */}
            <div className='text-right'>
              <p className='text-sm'>Contact us: (33)-360-6216</p>
              <p className='mt-1 text-sm'>
                Get gaming news and artTech promotions and offers!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className='flex w-full items-center justify-center py-5'>
        <div className='text-center text-sm'>
          <span>© 2024-2025 artTech All rights reserved. </span>
          {FOOTER_LINKS.map((link, index) => (
            <React.Fragment key={link.label}>
              <Link href={link.href} className='link-hover mx-1'>
                {link.label}
              </Link>
              {index < FOOTER_LINKS.length - 1 && '|'}
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
