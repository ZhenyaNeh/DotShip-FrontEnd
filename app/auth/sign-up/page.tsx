import type { Metadata } from 'next';

import { SignUpPage } from '@/src/pagesFSD/SignUpPage';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function Page() {
  return <SignUpPage />;
}
