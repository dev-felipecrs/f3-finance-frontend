export interface Format {
  format(date: Date, pattern: string): Format.Output
}

export namespace Format {
  export type Output = string
}
