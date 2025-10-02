import { HttpClient } from '@/data/protocols/http'

export interface IDeleteTransactionUseCase {
  execute(
    input: IDeleteTransactionUseCase.Input,
  ): Promise<HttpClient.Output<IDeleteTransactionUseCase.Output>>
}

export namespace IDeleteTransactionUseCase {
  export type Input = {
    transactionId: string
    Authorization?: string
  }

  export type Output = {
    data: null
  }
}
