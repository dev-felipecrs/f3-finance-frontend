import { FetchAdapter } from '@/infra/http'
import { GetUserByEmailUseCase } from '@/data/use-cases/users'

export const makeGetUserByEmailUseCase = () => {
  const httpClient = new FetchAdapter()
  const getUserByEmailUseCase = new GetUserByEmailUseCase(httpClient)

  return getUserByEmailUseCase
}
