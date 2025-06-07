import React from 'react'

import { twMerge } from 'tailwind-merge'
import Link, { LinkProps } from 'next/link'

import { condicionalStyles } from '@/presentation/helpers'

type AnchorPropsWithoutHref = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
>

type PaginationControlProps = LinkProps &
  AnchorPropsWithoutHref & {
    disabled?: boolean
  }

export const PaginationControl = React.forwardRef<
  HTMLAnchorElement,
  PaginationControlProps
>(({ className, disabled, onClick, ...props }, ref) => {
  return (
    <Link
      {...props}
      ref={ref}
      onClick={disabled ? (e) => e.stopPropagation() : onClick}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      className={condicionalStyles(
        twMerge(
          'cursor-pointer bg-transparent px-5 text-xs font-medium text-gray-300 hover:brightness-95',
          className,
        ),
        {
          'pointer-events-none brightness-75': !!disabled,
        },
      )}
    />
  )
})

PaginationControl.displayName = 'PaginationControl'
