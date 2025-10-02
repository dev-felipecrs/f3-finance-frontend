import { FetchAdapter } from '@/infra/http'
import { DeleteTransactionUseCase } from '@/data/use-cases/transactions'

export const makeDeleteTransactionUseCase = () => {
  const httpClient = new FetchAdapter()
  const deleteTransactionUseCase = new DeleteTransactionUseCase(httpClient)

  return deleteTransactionUseCase
}
