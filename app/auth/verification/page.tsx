import type { Metadata } from 'next';

import { VerificationPage } from '@/src/pagesFSD/VerificationPage';

export const metadata: Metadata = {
  title: 'Email confirmation',
};

export default function Page() {
  return <VerificationPage />;
}
