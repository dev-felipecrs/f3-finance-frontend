import { NextResponse, NextRequest } from 'next/server'
import { getCookie } from './presentation/actions'
import { UserCookiePayload } from './domain/models'
import { AUTHENTICATED_USER_COOKIE_KEY } from './presentation/constants'

export async function middleware(request: NextRequest) {
    const { value: user} = await getCookie<UserCookiePayload>(AUTHENTICATED_USER_COOKIE_KEY)
    if(!user || user?.expiredAt || request.nextUrl.pathname.startsWith('/admin')) return NextResponse.redirect(new URL('/accounts/login', request.url))
}

export const config = {
    matcher: ['/', '/admin'],
}