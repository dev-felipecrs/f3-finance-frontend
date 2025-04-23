'use client'

import React from 'react'

import { menuLinks } from '@/presentation/constants'

import { MenuSection } from './MenuSection'

import { Logo } from '../Logo'

export function Sidebar() {
  return (
    <aside className="border-light-mode hidden h-full w-82 border-r border-solid bg-white p-6 lg:block">
      <Logo size="md" />

      <div className="mt-15">
        {menuLinks.map((item) => (
          <MenuSection links={item.links} title={item.title} key={item.title} />
        ))}
      </div>
    </aside>
  )
}
