import React from 'react'

import { notFound } from 'next/navigation'

import {
  ADMIN_MENU_SECTIONS,
  AUTHENTICATED_USER_COOKIE_KEY,
  USER_MENU_SECTIONS,
} from '@/presentation/constants'
import { Header, Sidebar } from '@/presentation/components/shared'
import { getCookie } from '@/presentation/actions'
import { UserCookiePayload } from '@/domain/models'

export default async function LayoutApp({ children }: React.PropsWithChildren) {
  const { value: user } = await getCookie<UserCookiePayload>(
    AUTHENTICATED_USER_COOKIE_KEY,
  )

  if (!user) notFound()

  const menuSections = user.roles.includes('admin')
    ? ADMIN_MENU_SECTIONS
    : USER_MENU_SECTIONS

  return (
    <main className="bg-light-mode flex h-screen w-screen">
      <Sidebar menuSections={menuSections} />

      <div className="max-h-100vh flex-1 overflow-y-auto">
        <Header menuSections={menuSections} />

        <div className="p-6">{children}</div>
      </div>
    </main>
  )
}
