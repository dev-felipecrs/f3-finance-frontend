import React from 'react'

import { Metadata } from 'next'

interface UsersLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Usuários',
}

export default async function UsersLayout({ children }: UsersLayoutProps) {
  return (
    <section className="bg-white p-5">
      <header className="flex items-center justify-between">
        <strong className="text-lg leading-[150%] font-semibold text-gray-500">
          Usuários
        </strong>
      </header>

      {children}
    </section>
  )
}
