import { Loader2 } from 'lucide-react';
import { FC, Suspense } from 'react';

import { Profile } from '@/src/widgets/Profile';

export const ProfilePage: FC = () => {
  return (
    <Suspense fallback={<Loader2 className='animate-spin' />}>
      <Profile />
    </Suspense>
  );
};
