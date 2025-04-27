import { FetchAdapter } from '@/infra/http'
import { ForgotPasswordUseCase } from '@/data/use-cases/auth'

export const makeForgotPasswordUseCase = () => {
  const httpClient = new FetchAdapter()
  const forgotPasswordUseCase = new ForgotPasswordUseCase(httpClient)

  return forgotPasswordUseCase
}
