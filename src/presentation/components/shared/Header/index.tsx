import React from 'react'

import Link from 'next/link'
import { User } from '@phosphor-icons/react/dist/ssr'

export function Header() {
  return (
    <header className="flex items-center justify-end bg-white p-6">
      <Link
        href="#"
        className="flex h-16 w-16 items-center justify-center rounded-lg border border-gray-200 bg-white p-[1.125rem] hover:brightness-95"
      >
        <User size={24} />
      </Link>
    </header>
  )
}
