'use client'
import React from 'react'

import { twMerge } from 'tailwind-merge'

import { DialogRadixAdapter } from '@/infra/dialog'

export interface ContentProps {
  children: React.ReactNode
  title: string
  className?: string
}

export function Content({ children, title, className }: ContentProps) {
  const Dialog = new DialogRadixAdapter()

  return (
    <Dialog.Content
      className={twMerge(
        'animate-fade-in-content fixed top-1/2 left-1/2 -translate-1/2 rounded-md bg-white focus:outline-none',
        className,
      )}
    >
      <Dialog.Title className="invisible hidden overflow-hidden">
        {title}
      </Dialog.Title>

      {children}
    </Dialog.Content>
  )
}
