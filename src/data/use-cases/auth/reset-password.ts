import { UseCaseErrorHandlerDecorator } from '@/presentation/decorators'
import { IResetPasswordUseCase } from '@/domain/use-cases/auth'
import { UserRole } from '@/domain/entities'
import { HttpClient } from '@/data/protocols/http'

type ResetPasswordReturn = {
  user_id: string
  email: string
  roles: UserRole[]
  auth_token: string
  created_at: Date
  updated_at: Date
}

@UseCaseErrorHandlerDecorator()
export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(private readonly http: HttpClient) {}

  async execute(
    input: IResetPasswordUseCase.Input,
  ): Promise<HttpClient.Output<IResetPasswordUseCase.Output>> {
    const response = await this.http.on<ResetPasswordReturn>({
      url: process.env.BASE_API_URL + '/auth/reset-password',
      method: 'POST',
      body: {
        token: input.token,
        password: input.password,
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
        updatedAt: response.data.updated_at,
        createdAt: response.data.created_at,
      },
    }
  }
}
