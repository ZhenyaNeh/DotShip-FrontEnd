import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';

import { TanstackQueryProvider } from '@/src/app/providers/TanstackQueryProvider';
import { ThemeProvider } from '@/src/app/providers/ThemeProvider';
import { ToastProvider } from '@/src/app/providers/ToastProvider';
import '@/src/app/style/globals.css';
import { Footer } from '@/src/widgets/Footer';
import { Header } from '@/src/widgets/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    absolute: 'DotShip',
    template: '%s | DotShip',
  },
  description:
    'DotShip is a classic "Sea Battle" game with a simple and intuitive interface, made in a minimalist style.',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanstackQueryProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className='flex w-full flex-wrap items-center justify-center pt-[133px]'>
              <div className='container mx-auto flex max-w-7xl flex-wrap items-center justify-center px-3'>
                <ToastProvider />
                {children}
              </div>
            </main>
            <Footer />
          </ThemeProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
