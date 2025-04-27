'use client'
import React from 'react'

import { DialogRadixAdapter } from '@/infra/dialog'

interface PortalProps {
  children: React.ReactNode
}

export function Portal({ children }: PortalProps) {
  const Dialog = new DialogRadixAdapter()

  return <Dialog.Portal>{children}</Dialog.Portal>
}
