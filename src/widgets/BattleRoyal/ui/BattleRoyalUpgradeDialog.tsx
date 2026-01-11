import { FileWarning, Gift } from 'lucide-react';
import React, { FC, useState } from 'react';

import { BattleRoyalUpgradeType } from '../types/battle-royal-initial.types';
import {
  getUpgradeDescription,
  getUpgradeDisplayName,
  getUpgradeIcon,
} from '../utils/ get-upgrade.utils';

import { BattleRoyalUpgradeDto } from '@/src/app/providers/BattleRoyalProvider/dto/bonus.dto';
import { cn } from '@/src/shared/lib/clsx';
import { Button } from '@/src/shared/ui/Button/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/src/shared/ui/Dialog/Dialog';

interface UpgradeSlot {
  slotIndex: number;
  upgradeType: BattleRoyalUpgradeType;
}

interface BattleRoyalUpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  upgradeData: BattleRoyalUpgradeDto;
  currentSlots: UpgradeSlot[];
  onSelectSlot: (slotIndex: number, upgrade: BattleRoyalUpgradeDto) => void;
}

const BattleRoyalUpgradeDialog: FC<BattleRoyalUpgradeDialogProps> = ({
  open,
  onOpenChange,
  upgradeData,
  currentSlots,
  onSelectSlot,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const handleConfirm = () => {
    if (selectedSlot !== null) {
      onSelectSlot(selectedSlot, upgradeData);
      onOpenChange(false);
      setSelectedSlot(null);
    }
  };

  const handleDiscard = () => {
    onSelectSlot(4, upgradeData);
    onOpenChange(false);
    setSelectedSlot(null);
  };

  const UpgradeIcon = upgradeData.upgradeType
    ? getUpgradeIcon(upgradeData.upgradeType)
    : Gift;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl font-bold'>
            🎯 Bonus found!
          </DialogTitle>
          <DialogDescription className='text-center'>
            Choose a slot to upgrade or decline the bonus
          </DialogDescription>
        </DialogHeader>

        <div className='bg-muted/40 border-muted mb-6 rounded-lg border bg-gradient-to-r p-4'>
          <div className='flex flex-col items-center justify-center'>
            <UpgradeIcon />
            <h3 className='text-lg font-semibold'>
              {getUpgradeDisplayName(upgradeData.upgradeType)}
            </h3>
            <p className='text-muted-foreground text-sm'>
              {getUpgradeDescription(upgradeData.upgradeType)}
            </p>
          </div>
        </div>

        {upgradeData.upgradeType !== BattleRoyalUpgradeType.EXTRA_LIFE && (
          <div>
            <h2 className='mb-3 text-center text-xl font-bold'>Select slot</h2>
            <div className='grid grid-cols-3 gap-3'>
              {currentSlots
                .sort((a, b) => a.slotIndex - b.slotIndex)
                .map(slot => {
                  const UpgradeIconSlot = slot.upgradeType
                    ? getUpgradeIcon(slot.upgradeType)
                    : Gift;
                  return (
                    <div
                      key={slot.slotIndex}
                      className={cn(
                        'dark:shadow-border/40 mb-6 cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md',
                        slot.upgradeType
                          ? 'bg-muted/40 border-muted'
                          : 'bg-border/30 border-border',
                        selectedSlot === slot.slotIndex
                          ? 'border-yellow-500 bg-yellow-500/40' // добавляем тень для темной темы
                          : ''
                      )}
                      onClick={() => setSelectedSlot(slot.slotIndex)}
                    >
                      <div className='flex flex-col items-center justify-center'>
                        <UpgradeIconSlot />
                        <h3 className='text-center font-semibold'>
                          {getUpgradeDisplayName(slot.upgradeType)}
                        </h3>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {selectedSlot !== null && currentSlots[selectedSlot]?.upgradeType && (
          <div className='border-muted bg-muted/30 mb-4 flex items-center space-x-3 rounded-lg border p-3'>
            <FileWarning />
            <p className='text-sm'>
              You are replacing{' '}
              <strong>
                {getUpgradeDisplayName(currentSlots[selectedSlot].upgradeType!)}
              </strong>{' '}
              for a new upgrade
            </p>
          </div>
        )}

        <div className='flex justify-between gap-3'>
          {upgradeData.upgradeType !== BattleRoyalUpgradeType.EXTRA_LIFE ? (
            <>
              <Button
                variant='outline'
                onClick={handleDiscard}
                className='flex-1'
              >
                Skip
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={selectedSlot === null}
                className='flex-1'
              >
                {selectedSlot === null
                  ? 'Select slot'
                  : `Install in slot ${selectedSlot + 1}`}
              </Button>
            </>
          ) : (
            <Button onClick={handleDiscard} className='flex-1'>
              Apply
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BattleRoyalUpgradeDialog;
