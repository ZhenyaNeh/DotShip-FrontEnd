import { FC, PropsWithChildren } from 'react';

import { PlacementProvider } from '@/src/app/providers/PlacementProvider';

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return <PlacementProvider>{children}</PlacementProvider>;
};

export default RootLayout;
