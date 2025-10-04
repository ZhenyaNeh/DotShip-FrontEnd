import type { Metadata } from 'next';

import { SignInPage } from '@/src/pagesFSD/SignInPage';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function Page() {
  return <SignInPage />;
}
