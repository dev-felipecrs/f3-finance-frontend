'use client'

import React from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { condicionalStyles } from '@/presentation/helpers'
import { LinkItem as LinkItemType } from '@/presentation/constants'

type LinkItemProps = Pick<LinkItemType, 'href' | 'icon' | 'title'> & {
  onClick?: () => void
}

export function LinkItem({ href, title, icon: Icon, onClick }: LinkItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={condicionalStyles(
        'group flex w-full items-center gap-5 p-5 text-gray-400 hover:text-gray-500',
        {
          'text-primary-500 hover:text-primary-600': isActive,
        },
      )}
    >
      {isActive && (
        <span className="bg-primary-500 absolute left-0 h-12 w-1 rounded-sm" />
      )}

      <Icon
        size={24}
        className={condicionalStyles(
          'text-gray-400 group-hover:text-gray-500',
          {
            'text-primary-500 group-hover:text-primary-600': isActive,
          },
        )}
      />

      <h3 className="text-base font-semibold">{title}</h3>
    </Link>
  )
}
