import { NextRequest, NextResponse } from 'next/server'

import { AUTHENTICATED_USER_COOKIE_KEY } from './presentation/constants'
import { getCookie } from './presentation/actions'
import { UserCookiePayload } from './domain/models'

export async function middleware(request: NextRequest) {
  const { value: user } = await getCookie<UserCookiePayload>(
    AUTHENTICATED_USER_COOKIE_KEY,
  )
  if (!user || user?.expiredAt || request.nextUrl.pathname.startsWith('/admin'))
    return NextResponse.redirect(new URL('/accounts/login', request.url))
}

export const config = {
  matcher: ['/', '/admin'],
}
