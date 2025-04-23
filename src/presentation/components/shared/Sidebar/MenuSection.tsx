import React from 'react'

import { MenuSection as MenuSectionType } from '@/presentation/constants'

import { LinkItem } from './LinkItem'

type MenuSectionProps = Pick<MenuSectionType, 'links' | 'title'> & {
  onNavigate?: () => void
}
export function MenuSection({ links, title, onNavigate }: MenuSectionProps) {
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
            onClick={onNavigate}
          />
        ))}
      </div>
    </div>
  )
}
