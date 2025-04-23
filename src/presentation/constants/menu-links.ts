import { ElementType } from 'react'

import { SquaresFour, UserCircle } from '@phosphor-icons/react'

export type LinkItem = {
  icon: ElementType
  title: string
  href: string
}

export type MenuSection = {
  title: string
  links: LinkItem[]
}

export const menuLinks: MenuSection[] = [
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
