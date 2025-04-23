import {
  UseCaseAuthDecorator,
  UseCaseErrorHandlerDecorator,
} from '@/presentation/decorators'
import { IInviteUserUseCase } from '@/domain/use-cases/users'
import { UserRole } from '@/domain/entities'
import { HttpClient } from '@/data/protocols/http'

type InviteUserReturn = {
  user_id: string
  email: string
  roles: UserRole[]
  auth_token?: string
  created_at: Date
  updated_at: Date
}

@UseCaseErrorHandlerDecorator()
@UseCaseAuthDecorator()
export class InviteUserUseCase implements IInviteUserUseCase {
  constructor(private readonly http: HttpClient) {}

  async execute(
    input: IInviteUserUseCase.Input,
  ): Promise<HttpClient.Output<IInviteUserUseCase.Output>> {
    const response = await this.http.on<InviteUserReturn>({
      url: process.env.BASE_API_URL + `/users`,
      method: 'POST',
      body: {
        email: input.email,
        roles: input.roles,
      },
      headers: {
        Authorization: input.Authorization,
      },
    })

    if (response.error || !response.data) {
      return {
        status: response.status,
        error: response.error,
      }
    }

    return {
      status: response.status,
      data: {
        userId: response.data.user_id,
        email: response.data.email,
        roles: response.data.roles,
        createdAt: response.data.created_at,
        updatedAt: response.data.updated_at,
      },
    }
  }
}
