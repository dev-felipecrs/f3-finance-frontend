import { Transaction, TransactionType } from '@/domain/entities'
import { HttpClient } from '@/data/protocols/http'

export interface IFindAllTransactionsUseCase {
  execute(
    input: IFindAllTransactionsUseCase.Input,
  ): Promise<HttpClient.Output<IFindAllTransactionsUseCase.Output>>
}

export namespace IFindAllTransactionsUseCase {
  export type Input = {
    page: number
    pageSize: number
    filters: {
      transaction_type?: TransactionType[]
    }
    Authorization?: string
  }

  export type Output = {
    page: number
    pageCount: number
    pageResult: Transaction[]
    totalCount: number
    totalPages: number
  }
}
