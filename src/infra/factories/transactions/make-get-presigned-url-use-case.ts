import { FetchAdapter } from '@/infra/http'
import { GetPresignedUrlUseCase } from '@/data/use-cases/transactions'

export const makeGetPresignedUrlUseCase = () => {
  const httpClient = new FetchAdapter()
  const getPresignedUrlUseCase = new GetPresignedUrlUseCase(httpClient)

  return getPresignedUrlUseCase
}
