import { HttpClient } from '@/data/protocols/http'

export interface IForgotPasswordUseCase {
  execute(
    input: IForgotPasswordUseCase.Input,
  ): Promise<HttpClient.Output<IForgotPasswordUseCase.Output>>
}

export namespace IForgotPasswordUseCase {
  export type Input = {
    email: string
  }

  export type Output = null
}
