import { type NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/auth/:path*', '/profile/:path*'],
};

export default function middleware(request: NextRequest) {
  const { url, cookies } = request;

  const session = cookies.get('session')?.value;

  const isAuthPage = url.includes('/auth');

  if (isAuthPage) {
    if (session) {
      return NextResponse.redirect(new URL('/profile/settings', url));
    }

    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL('/auth/sign-in', url));
  }
}
