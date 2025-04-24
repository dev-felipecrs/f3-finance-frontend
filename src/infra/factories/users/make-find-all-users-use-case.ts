import { FetchAdapter } from '@/infra/http'
import { FindAllUsersUseCase } from '@/data/use-cases/users'

export const makeFindAllUsersUseCase = () => {
  const httpClient = new FetchAdapter()
  const findAllUsersUseCase = new FindAllUsersUseCase(httpClient)

  return findAllUsersUseCase
}
