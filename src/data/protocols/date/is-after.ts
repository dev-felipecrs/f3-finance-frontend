export interface IsAfter {
  isAfter(date: Date, dateToCompare: Date): IsAfter.Output
}

export namespace IsAfter {
  export type Output = boolean
}
