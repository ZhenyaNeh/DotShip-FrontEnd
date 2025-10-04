import type { Metadata } from 'next';

import { ResetPasswordPage } from '@/src/pagesFSD/ResetPasswordPage';

export const metadata: Metadata = {
  title: 'Reset password',
};

export default function Page() {
  return <ResetPasswordPage />;
}
