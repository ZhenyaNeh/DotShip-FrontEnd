import { cva } from 'class-variance-authority';

import { ShipType, VariantType } from '../model/types/shipTypes';

export const shipVariants = cva(
  'static cursor-pointer outline-background rounded-lg max-sm:rounded-md bg-foreground relative bottom-[1px] right-[1px]',
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
  `ship_${Math.max(ship.cords.w + 1, ship.cords.h + 1)}_${ship.cords.w > ship.cords.h ? 'hor' : 'vert'}` as VariantType;
