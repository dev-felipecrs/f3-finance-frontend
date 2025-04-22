import { User } from '@/domain/entities'
import { HttpClient } from '@/data/protocols/http'

export interface IGetUserByEmailUseCase {
  execute(
    input: IGetUserByEmailUseCase.Input,
  ): Promise<HttpClient.Output<IGetUserByEmailUseCase.Output>>
}

export namespace IGetUserByEmailUseCase {
  export type Input = {
    email: string
    Authorization?: string
  }

  export type Output = User
}
