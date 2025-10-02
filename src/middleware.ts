import { NextRequest, NextResponse } from 'next/server'

import { AUTHENTICATED_USER_COOKIE_KEY } from './presentation/constants'
import { getCookie } from './presentation/actions'
import { UserCookiePayload } from './domain/models'

export async function middleware(request: NextRequest) {
  const { value: user } = await getCookie<UserCookiePayload>(
    AUTHENTICATED_USER_COOKIE_KEY,
  )

  const isAuthenticated = user && new Date(user.expiredAt) > new Date()
  const isAppRoute = request.nextUrl.pathname.startsWith('/app')
  const isAccountsRoute = request.nextUrl.pathname.startsWith('/accounts')
  const isRootRoute = request.nextUrl.pathname === '/'

  if (!isAuthenticated && (isAppRoute || isRootRoute)) {
    return NextResponse.redirect(new URL('/accounts/login', request.url))
  }

  if (isAuthenticated && isAccountsRoute) {
    return NextResponse.redirect(new URL('/app', request.url))
  }

  if (isAuthenticated && isRootRoute) {
    return NextResponse.redirect(new URL('/app', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/app/:path*', '/accounts/:path*'],
}
