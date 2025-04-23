import { User } from '@/domain/entities'
import { HttpClient } from '@/data/protocols/http'

export interface IResetPasswordUseCase {
  execute(
    input: IResetPasswordUseCase.Input,
  ): Promise<HttpClient.Output<IResetPasswordUseCase.Output>>
}

export namespace IResetPasswordUseCase {
  export type Input = {
    auth_token: string
    password: string
  }

  export type Output = Omit<User, 'password'> & {
    token: string
  }
}
