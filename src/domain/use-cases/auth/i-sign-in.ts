import { HttpClient } from '@/data/protocols/http'

export interface ISignInUseCase {
  execute(
    input: ISignInUseCase.Input,
  ): Promise<HttpClient.Output<ISignInUseCase.Output>>
}

export namespace ISignInUseCase {
  export type Input = {
    email: string
    password: string
  }

  export type Output = {
    accessToken: string
    refreshToken: string
    expiresIn: number
  }
}
