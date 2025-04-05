import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');
  const pathname = request.nextUrl.pathname;

  // 보호가 필요한 경로 정의
  const protectedPaths = ['/main', '/study', '/study/[studyId]'];

  // 로그인하지 않은 사용자가 보호된 경로에 접근하려고 할 때
  if (!accessToken && protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/', request.url));
  } 

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/:path*'],
};
