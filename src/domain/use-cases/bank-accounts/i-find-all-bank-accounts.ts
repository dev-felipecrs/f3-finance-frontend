import { BankAccount } from '@/domain/entities'
import { HttpClient } from '@/data/protocols/http'

export interface IFindAllBankAccountsUseCase {
  execute(
    input: IFindAllBankAccountsUseCase.Input,
  ): Promise<HttpClient.Output<IFindAllBankAccountsUseCase.Output>>
}

export namespace IFindAllBankAccountsUseCase {
  export type Input = {
    page: number
    pageSize: number
    Authorization?: string
  }

  export type Output = {
    page: number
    pageCount: number
    pageResult: BankAccount[]
    totalCount: number
    totalPages: number
  }
}
