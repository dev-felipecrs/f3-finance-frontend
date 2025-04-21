import { Locale } from '@/domain/models'

export interface Format {
  format(date: Date, pattern: string, locale: Locale): Format.Output
}

export namespace Format {
  export type Output = string
}
