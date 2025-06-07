import { FetchAdapter } from '@/infra/http'
import { CreateBankAccountUseCase } from '@/data/use-cases/bank-accounts'

export const makeCreateBankCreateBankAccountUseCase = () => {
  const httpClient = new FetchAdapter()
  const createBankAccountUseCase = new CreateBankAccountUseCase(httpClient)

  return createBankAccountUseCase
}
