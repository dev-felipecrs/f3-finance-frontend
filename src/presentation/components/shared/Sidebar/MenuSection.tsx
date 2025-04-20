import React from 'react'

import { MenuSection as MenuSectionProps } from '@/constants'

import { LinkItem } from './LinkItem'

export function MenuSection({ links, title }: MenuSectionProps) {
  return (
    <div className="mb-10 flex flex-col gap-5">
      <h2 className="text-xs font-semibold tracking-[2.56px] text-gray-400 uppercase">
        {title}
      </h2>

      <div>
        {links.map((item) => (
          <LinkItem
            key={item.title}
            href={item.href}
            title={item.title}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  )
}
