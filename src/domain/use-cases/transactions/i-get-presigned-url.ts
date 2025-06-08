import { HttpClient } from '@/data/protocols/http'

export interface IGetPresignedUrlUseCase {
  execute(
    input: IGetPresignedUrlUseCase.Input,
  ): Promise<HttpClient.Output<IGetPresignedUrlUseCase.Output>>
}

export namespace IGetPresignedUrlUseCase {
  export type Input = {
    bankAccountId: string
    filename: string
    month: number
    year: number
    Authorization?: string
  }

  export type Output = {
    url: string
  }
}
