'use client'
import React from 'react'

import { DialogRadixAdapter } from '@/infra/dialog'

interface RootProps {
  open?: boolean
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>> | (() => void)
  children: React.ReactNode
}

export function Root({ open, onOpenChange, children }: RootProps) {
  const Dialog = new DialogRadixAdapter()

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  )
}
