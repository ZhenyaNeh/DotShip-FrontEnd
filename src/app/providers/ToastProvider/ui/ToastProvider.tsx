'use client';

import { FC } from 'react';

import { Toaster } from '@/src/shared/ui/Sonner/Sonner';

export const ToastProvider: FC = () => {
  return <Toaster position='top-center' duration={6000} />;
};
