export interface Dialog {
  Close: Dialog.Close
  Content: Dialog.Content
  Overlay: Dialog.Overlay
  Portal: Dialog.Portal
  Root: Dialog.Root
  Title: Dialog.Title
  Trigger: Dialog.Trigger
}

export namespace Dialog {
  export type Close<T = any | undefined> = T
  export type Content<T = any | undefined> = T
  export type Overlay<T = any | undefined> = T
  export type Portal<T = any | undefined> = T
  export type Root<T = any | undefined> = T
  export type Title<T = any | undefined> = T
  export type Trigger<T = any | undefined> = T
}
