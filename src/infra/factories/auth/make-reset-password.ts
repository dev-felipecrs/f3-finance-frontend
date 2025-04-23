import { FetchAdapter } from '@/infra/http'
import { ResetPasswordUseCase } from '@/data/use-cases/auth'

export const makeResetPasswordUseCase = () => {
  const httpClient = new FetchAdapter()
  const resetPasswordUseCase = new ResetPasswordUseCase(httpClient)

  return resetPasswordUseCase
}
