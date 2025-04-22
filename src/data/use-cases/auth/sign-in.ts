import { UseCaseErrorHandlerDecorator } from '@/presentation/decorators'
import { ISignInUseCase } from '@/domain/use-cases/auth'
import { HttpClient } from '@/data/protocols/http'

type SignUpReturn = {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

@UseCaseErrorHandlerDecorator()
export class SignInUseCase implements ISignInUseCase {
  constructor(private readonly http: HttpClient) {}

  async execute(
    input: ISignInUseCase.Input,
  ): Promise<HttpClient.Output<ISignInUseCase.Output>> {
    const response = await this.http.on<SignUpReturn>({
      url: process.env.BASE_API_URL + '/auth/sign-in',
      method: 'POST',
      body: {
        email: input.email,
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
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
      },
    }
  }
}
