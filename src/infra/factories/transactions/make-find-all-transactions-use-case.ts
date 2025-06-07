import { FetchAdapter } from '@/infra/http'
import { FindAllTransactionsUseCase } from '@/data/use-cases/transactions'

export const makeFindAllTransactionsUseCase = () => {
  const httpClient = new FetchAdapter()
  const findAllTransactionsUseCase = new FindAllTransactionsUseCase(httpClient)

  return findAllTransactionsUseCase
}
