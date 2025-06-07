import { FetchAdapter } from '@/infra/http'
import { FindAllBankAccountsUseCase } from '@/data/use-cases/bank-accounts'

export const makeFindAllBankAccountsUseCase = () => {
  const httpClient = new FetchAdapter()
  const findAllBankAccountsUseCase = new FindAllBankAccountsUseCase(httpClient)

  return findAllBankAccountsUseCase
}
