'use client'
import React from 'react'

import { DialogRadixAdapter } from '@/infra/dialog'

interface TriggerProps {
  children: React.ReactNode
}

export function Trigger({ children }: TriggerProps) {
  const Dialog = new DialogRadixAdapter()

  return <Dialog.Trigger asChild>{children}</Dialog.Trigger>
}
