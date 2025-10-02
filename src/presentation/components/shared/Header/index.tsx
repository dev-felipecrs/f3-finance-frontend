'use client'
import React, { useState } from 'react'

import { List } from '@phosphor-icons/react'

import { MenuSection } from '@/presentation/constants'

import { MobileSidebar } from '../Sidebar'
import { Logo } from '../Logo'
import { LogoutButton } from './LogoutButton'

interface HeaderProps {
  menuSections: MenuSection[]
}

export function Header({ menuSections }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="flex items-center justify-between bg-white p-6 lg:justify-end">
      <div className="lg:hidden">
        <button onClick={() => setMenuOpen(true)}>
          <List size={34} />
        </button>

        <MobileSidebar
          menuSections={menuSections}
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      </div>

      <div className="lg:hidden">
        <Logo size="md" />
      </div>

      <LogoutButton />
    </header>
  )
}
