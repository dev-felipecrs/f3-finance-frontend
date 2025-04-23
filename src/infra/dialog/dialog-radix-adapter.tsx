import React from 'react'

import * as RadixDialog from '@radix-ui/react-dialog'

import { Dialog } from '@/data/protocols/dialog'

export class DialogRadixAdapter implements Dialog {
  Close: Dialog.Close<
    React.ForwardRefExoticComponent<
      RadixDialog.DialogCloseProps & React.RefAttributes<HTMLButtonElement>
    >
  >

  Content: Dialog.Content<
    React.ForwardRefExoticComponent<
      RadixDialog.DialogContentProps & React.RefAttributes<HTMLDivElement>
    >
  >

  Overlay: Dialog.Overlay<
    React.ForwardRefExoticComponent<
      RadixDialog.DialogOverlayProps & React.RefAttributes<HTMLDivElement>
    >
  >

  Portal: Dialog.Portal<React.FC<RadixDialog.DialogPortalProps>>
  Root: Dialog.Root<React.FC<RadixDialog.DialogProps>>
  Title: Dialog.Title<
    React.ForwardRefExoticComponent<RadixDialog.DialogTitleProps>
  >

  Trigger: Dialog.Trigger<
    React.ForwardRefExoticComponent<
      RadixDialog.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>
    >
  >

  constructor() {
    this.Close = RadixDialog.Close
    this.Content = RadixDialog.Content
    this.Overlay = RadixDialog.Overlay
    this.Portal = RadixDialog.Portal
    this.Root = RadixDialog.Root
    this.Title = RadixDialog.Title
    this.Trigger = RadixDialog.Trigger
  }
}
