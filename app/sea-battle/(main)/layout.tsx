import { PlacementProvider } from '@/src/app/providers/PlacementProvider';
import { FC, PropsWithChildren } from 'react';

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (<PlacementProvider>{children}</PlacementProvider>);
};

export default RootLayout;
