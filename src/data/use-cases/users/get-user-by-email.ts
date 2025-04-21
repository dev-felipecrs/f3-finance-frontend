import {
  UseCaseAuthDecorator,
  UseCaseErrorHandlerDecorator,
} from '@/presentation/decorators'
import { IGetUserByEmailUseCase } from '@/domain/use-cases/users'
import { UserRole } from '@/domain/entities'
import { HttpClient } from '@/data/protocols/http'

type SignUpReturn = {
  user_id: string
  email: string
  roles: UserRole[]
  auth_token?: string
  created_at: Date
  updated_at: Date
}

@UseCaseErrorHandlerDecorator()
@UseCaseAuthDecorator()
export class GetUserByEmailUseCase implements IGetUserByEmailUseCase {
  constructor(private readonly http: HttpClient) {}

  async execute(
    input: IGetUserByEmailUseCase.Input,
  ): Promise<HttpClient.Output<IGetUserByEmailUseCase.Output>> {
    const response = await this.http.on<SignUpReturn>({
      url: process.env.BASE_API_URL + `/users/by-email/${input.email}`,
      method: 'GET',
      headers: {
        Authorization: input.accessToken,
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
