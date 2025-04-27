'use client'
import React from 'react'

import { twMerge } from 'tailwind-merge'
import { DialogCloseProps } from '@radix-ui/react-dialog'

import { DialogRadixAdapter } from '@/infra/dialog'

interface CloseProps extends DialogCloseProps {
  children: React.ReactNode
}

export function Close({ children, ...rest }: CloseProps) {
  const Dialog = new DialogRadixAdapter()

  return (
    <Dialog.Close
      {...rest}
      className={twMerge('transition-all hover:brightness-90', rest.className)}
    >
      {children}
    </Dialog.Close>
  )
}
