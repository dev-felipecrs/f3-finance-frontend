import { FetchAdapter } from '@/infra/http'
import { NotifyImportationUseCase } from '@/data/use-cases/transactions'

export const makeNotifyImportationUseCase = () => {
  const httpClient = new FetchAdapter()
  const notifyImportationUseCase = new NotifyImportationUseCase(httpClient)

  return notifyImportationUseCase
}
