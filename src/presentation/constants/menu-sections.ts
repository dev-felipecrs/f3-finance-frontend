'use client'
import { Icon, SquaresFour, UserCircle } from '@phosphor-icons/react'

export type LinkItem = {
  icon: Icon
  title: string
  href: string
}

export type MenuSection = {
  title: string
  links: LinkItem[]
}

export const USER_MENU_SECTIONS: MenuSection[] = [
  {
    title: 'Principal',
    links: [
      {
        icon: SquaresFour,
        title: 'Dashboard',
        href: '/app',
      },
    ],
  },
]

export const ADMIN_MENU_SECTIONS: MenuSection[] = [
  ...USER_MENU_SECTIONS,
  {
    title: 'Administrador',
    links: [
      {
        icon: UserCircle,
        title: 'Usuários',
        href: '/app/admin/users',
      },
    ],
  },
]
