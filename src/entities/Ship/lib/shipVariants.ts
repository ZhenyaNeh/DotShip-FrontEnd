import { cva } from 'class-variance-authority';

import { ShipType, VariantType } from '@/src/shared/lib/types';

export const shipVariants = cva(
  'static cursor-pointer rounded-lg max-sm:rounded-md bg-foreground left-[-2%] top-[-2%] max-sm:left-[-4%] max-sm:top-[-4%]',
  {
    variants: {
      variant: {
        ship_4_hor: 'w-[169px] h-[40px] max-sm:w-[106px] max-sm:h-[25px]',
        ship_4_vert: 'w-[40px] h-[169px] max-sm:w-[25px] max-sm:h-[106px]',
        ship_3_hor: 'w-[126px] h-[40px] max-sm:w-[79px] max-sm:h-[25px]',
        ship_3_vert: 'w-[40px] h-[126px] max-sm:w-[25px] max-sm:h-[79px]',
        ship_2_hor: 'w-[83px] h-[40px] max-sm:w-[52px] max-sm:h-[25px]',
        ship_2_vert: 'w-[40px] h-[83px] max-sm:w-[25px] max-sm:h-[52px]',
        ship_1_hor: 'w-[40px] h-[40px] max-sm:w-[25px] max-sm:h-[25px]',
        ship_1_vert: 'w-[40px] h-[40px] max-sm:w-[25px] max-sm:h-[25px]',
      },
    },
  }
);

export const getVariant = (ship: ShipType) =>
  `ship_${Math.max(ship.w + 1, ship.h + 1)}_${ship.w > ship.h ? 'hor' : 'vert'}` as VariantType;
