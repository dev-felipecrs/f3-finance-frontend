export interface Add {
  add(date: Date, options: Add.Options): Add.Output
}

export namespace Add {
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
