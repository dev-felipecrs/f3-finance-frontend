import { UseCaseErrorHandlerDecorator } from '@/presentation/decorators'
import { ISignInUseCase } from '@/domain/use-cases/auth'
import { HttpClient } from '@/data/protocols/http'

type SignUpReturn = {
  user_id: string
  access_token: string
  refresh_token: string
  expires_in: number
}

@UseCaseErrorHandlerDecorator()
export class SignInUseCase implements ISignInUseCase {
  constructor(private readonly http: HttpClient) {}

  async execute(
    input: ISignInUseCase.Input,
  ): Promise<HttpClient.Output<ISignInUseCase.Output>> {
    console.log(process.env)
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
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresIn: response.data.expires_in,
      },
    }
  }
}
