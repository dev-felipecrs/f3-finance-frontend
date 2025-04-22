import { ToastStatus } from '@/domain/models'

export interface Toast {
  toast(input: Toast.Input): Toast.Output
}

export namespace Toast {
  export type Input = {
    status: ToastStatus
    text: string
  }

  export type Output = void
}
