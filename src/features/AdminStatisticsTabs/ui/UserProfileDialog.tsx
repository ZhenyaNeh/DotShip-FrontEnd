import { DialogTrigger } from '@radix-ui/react-dialog';
import { Eye } from 'lucide-react';
import { FC, useState } from 'react';

import { FriendTabs } from '../../FriendTabs';
import { StatisticsTabs } from '../../StatisticsTabs';

import { getImage } from '@/src/shared/lib/get-image';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/shared/ui/Avatar/Avatar';
import { Button } from '@/src/shared/ui/Button/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/shared/ui/Dialog/Dialog';
import { ScrollArea } from '@/src/shared/ui/ScrollArea/ScrollArea';

interface Props {
  userId: string;
  picture: string;
  displayName: string;
  email: string;
  rating: number;
}

export const UserProfileDialog: FC<Props> = props => {
  const { userId, picture, displayName, email, rating } = props;

  const [open, setOpen] = useState(false);

  const handleOpenChange = () => {
    setOpen(prev => !prev);
  };

  if (!userId) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size='sm' variant='outline' className='gap-1'>
          <Eye className='h-3 w-3' />
          View Profile
        </Button>
      </DialogTrigger>
      <DialogContent className='h-[90vh] w-full min-w-3xl overflow-hidden p-6'>
        <DialogHeader className='border-b px-6 pt-6 pb-4'>
          <DialogTitle className='text-2xl'>User Profile</DialogTitle>
          <DialogDescription asChild>
            <div className='flex items-center'>
              <Avatar>
                <AvatarImage
                  src={getImage(picture)}
                  alt={displayName || 'User'}
                />
                <AvatarFallback>{displayName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className='ml-4 flex flex-col space-y-1'>
                <span>
                  Viewing profile details for user: {displayName || userId}
                </span>
                <span>
                  Email: {email || 'N/A'}, Rating: {rating ?? 'N/A'}
                </span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='max-h-[calc(80vh-150px)]'>
          <div className='p-6'>
            <div className='space-y-8'>
              <FriendTabs userId={userId} forAdmin={true} />
              <StatisticsTabs userId={userId} />
            </div>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={handleOpenChange}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
