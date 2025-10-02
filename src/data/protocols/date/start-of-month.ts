export interface StartOfMonth {
  startOfMonth(date: Date): StartOfMonth.Output
}

export namespace StartOfMonth {
  export type Output = Date
}
