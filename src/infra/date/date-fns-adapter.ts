import { ptBR } from 'date-fns/locale'
import {
  add as dateFnsAdd,
  format as dateFnsFormat,
  isAfter as dateFnsIsAfter,
  startOfMonth as dateFnsStartOfMonth,
  sub as dateFnsSub,
} from 'date-fns'

import { Add, Format, IsAfter, StartOfMonth, Sub } from '@/data/protocols/date'

export class DateFnsAdapter implements Add, Format, Sub, StartOfMonth, IsAfter {
  add(date: Date, options: Add.Options): Add.Output {
    const result = dateFnsAdd(new Date(date), {
      ...options,
    })

    return result
  }

  format(date: Date, pattern: string): Format.Output {
    const result = dateFnsFormat(date, pattern, {
      locale: ptBR,
    })

    return result
  }

  sub(date: Date, options: Sub.Options): Sub.Output {
    const result = dateFnsSub(new Date(date), {
      ...options,
    })

    return result
  }

  startOfMonth(date: Date): StartOfMonth.Output {
    const result = dateFnsStartOfMonth(new Date(date))

    return result
  }

  isAfter(date: Date, dateToCompare: Date): IsAfter.Output {
    const result = dateFnsIsAfter(new Date(date), new Date(dateToCompare))

    return result
  }
}
