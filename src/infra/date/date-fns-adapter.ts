import { enUS, es, ptBR } from 'date-fns/locale'
import {
  add as dateFnsAdd,
  format as dateFnsFormat,
  Locale as DateFnsLocale,
} from 'date-fns'

import { Locale } from '@/domain/models'
import { Add, Format } from '@/data/protocols/date'

export class DateFnsAdapter implements Add, Format {
  add(date: Date, options: Add.Options): Add.Output {
    const result = dateFnsAdd(new Date(date), {
      ...options,
    })

    return result
  }

  format(date: Date, pattern: string, locale: Locale): Format.Output {
    const localeStrategy: Record<Locale, DateFnsLocale> = {
      en: enUS,
      es,
      pt: ptBR,
    }

    const result = dateFnsFormat(date, pattern, {
      locale: localeStrategy[locale],
    })

    return result
  }
}
