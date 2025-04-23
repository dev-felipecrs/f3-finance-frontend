'use client'
import React from 'react'

import { DialogRadixAdapter } from '@/infra/dialog'

export function Overlay() {
  const Dialog = new DialogRadixAdapter()

  return (
    <Dialog.Overlay className="animate-fade-in-overlay fixed inset-0 bg-black/85" />
  )
}
