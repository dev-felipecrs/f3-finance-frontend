'use client'
import React from 'react'

import { MenuSection as IMenuSection } from '@/presentation/constants'

import { MenuSection } from './MenuSection'

import { Logo } from '../Logo'

interface SidebarProps {
  menuSections: IMenuSection[]
}

export function Sidebar({ menuSections }: SidebarProps) {
  return (
    <aside className="border-light-mode hidden h-full w-82 border-r border-solid bg-white p-6 lg:block">
      <Logo size="md" />

      <div className="mt-15">
        {menuSections.map((section) => (
          <MenuSection
            links={section.links}
            title={section.title}
            key={section.title}
          />
        ))}
      </div>
    </aside>
  )
}
