import { User, UserRole } from '@/domain/entities'
import { HttpClient } from '@/data/protocols/http'

export interface IInviteUserUseCase {
  execute(
    input: IInviteUserUseCase.Input,
  ): Promise<HttpClient.Output<IInviteUserUseCase.Output>>
}

export namespace IInviteUserUseCase {
  export type Input = {
    email: string
    roles: UserRole[]
    Authorization?: string
  }

  export type Output = User
}
