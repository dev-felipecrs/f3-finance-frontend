import { FetchAdapter } from '@/infra/http'
import { SignInUseCase } from '@/data/use-cases/auth'

export const makeSignInUseCase = () => {
  const httpClient = new FetchAdapter()
  const signInUseCase = new SignInUseCase(httpClient)

  return signInUseCase
}
