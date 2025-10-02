import { FetchAdapter } from '@/infra/http'
import { DeleteUserUseCase } from '@/data/use-cases/users'

export const makeDeleteUserUseCase = () => {
  const httpClient = new FetchAdapter()
  const getUserByEmailUseCase = new DeleteUserUseCase(httpClient)

  return getUserByEmailUseCase
}
