import React from 'react'

import { toast as sonnerToast, Toaster as SonnerToaster } from 'sonner'

import { Toast, Toaster } from '@/data/protocols/toast'

export class SonnerAdapter implements Toast, Toaster {
  toast(input: Toast.Input): Toast.Output {
    sonnerToast[input.status](input.text, {
      duration: 1000 * 10, // 10 seconds
    })
  }

  toaster(): Toaster.Output {
    return (
      <SonnerToaster position="bottom-right" visibleToasts={3} richColors />
    )
  }
}
