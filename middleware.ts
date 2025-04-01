import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const isLoggedIn = Boolean(request.cookies.get('access_token')?.value)

  const pathname = request.nextUrl.pathname

  // 로그인한 상태에서 로그인 전 메인으로 접근 시
  if (isLoggedIn && pathname.startsWith('/(beforeLogin)')) {
    return NextResponse.redirect(new URL('/(afterLogin)', request.url))
  }

  // 로그인하지 않은 상태에서 로그인 후 메인으로 접근 시
  if (!isLoggedIn && pathname.startsWith('/(afterLogin)')) {
    return NextResponse.redirect(new URL('/(beforeLogin)', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/(beforeLogin)',
    '/(afterLogin)',
  ],
}