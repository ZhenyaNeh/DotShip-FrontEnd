import { LOGO_SHADOW } from './logo-shadow.const';
import { cn } from '@/src/shared/lib/clsx';

export const LOGO_IMAGE_PROPS = {
  width: 0,
  height: 0,
  sizes: '100vw' as const,
  className: cn('h-auto w-full', LOGO_SHADOW),
  priority: true,
};
