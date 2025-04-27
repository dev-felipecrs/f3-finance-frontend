import { UseCaseErrorHandlerDecorator } from '@/presentation/decorators'
import { IForgotPasswordUseCase } from '@/domain/use-cases/auth'
import { HttpClient } from '@/data/protocols/http'

type ForgotPasswordReturn = null

@UseCaseErrorHandlerDecorator()
export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
  constructor(private readonly http: HttpClient) {}

  async execute(
    input: IForgotPasswordUseCase.Input,
  ): Promise<HttpClient.Output<IForgotPasswordUseCase.Output>> {
    const response = await this.http.on<ForgotPasswordReturn>({
      url: process.env.BASE_API_URL + '/auth/forgot-password',
      method: 'POST',
      body: {
        email: input.email,
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
      data: response.data,
    }
  }
}
