import { JSX } from 'react'

export interface Toaster {
  toaster(): Toaster.Output
}

export namespace Toaster {
  export type Output = JSX.Element
}
