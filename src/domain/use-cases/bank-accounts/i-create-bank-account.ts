import { BankAccount } from '@/domain/entities'
import { HttpClient } from '@/data/protocols/http'

export interface ICreateBankAccountUseCase {
  execute(
    input: ICreateBankAccountUseCase.Input,
  ): Promise<HttpClient.Output<ICreateBankAccountUseCase.Output>>
}

export namespace ICreateBankAccountUseCase {
  export type Input = {
    name: string
    bank: string
    agencyNumber: string
    accountNumber: string
    Authorization?: string
  }

  export type Output = BankAccount
}
