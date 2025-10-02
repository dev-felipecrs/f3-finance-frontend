export interface Sub {
  sub(date: Date, options: Sub.Options): Sub.Output
}

export namespace Sub {
  export type Options = {
    years?: number
    months?: number
    weeks?: number
    days?: number
    hours?: number
    minutes?: number
    seconds?: number
  }

  export type Output = Date
}
