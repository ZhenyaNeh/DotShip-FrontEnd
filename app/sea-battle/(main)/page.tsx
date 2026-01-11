import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

import PlacementPage from '@/src/pagesFSD/PlacementPage';

export default function Page() {
  return (
    <Suspense fallback={<Loader2 className='animate-spin' />}>
      <PlacementPage />;
    </Suspense>
  );
}
