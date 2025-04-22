import { ptBR } from 'date-fns/locale'
import { add as dateFnsAdd, format as dateFnsFormat } from 'date-fns'

import { Add, Format } from '@/data/protocols/date'

export class DateFnsAdapter implements Add, Format {
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
}
