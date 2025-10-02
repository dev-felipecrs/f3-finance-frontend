import { HttpClient } from '@/data/protocols/http'

export interface IDeleteUserUseCase {
  execute(
    input: IDeleteUserUseCase.Input,
  ): Promise<HttpClient.Output<IDeleteUserUseCase.Output>>
}

export namespace IDeleteUserUseCase {
  export type Input = {
    userId: string
    Authorization?: string
  }

  export type Output = void
}
