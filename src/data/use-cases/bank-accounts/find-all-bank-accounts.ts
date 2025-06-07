import {
  UseCaseAuthDecorator,
  UseCaseErrorHandlerDecorator,
} from '@/presentation/decorators'
import { IFindAllBankAccountsUseCase } from '@/domain/use-cases/bank-accounts'
import { Bank } from '@/domain/entities'
import { HttpClient } from '@/data/protocols/http'

type FindAllReturn = {
  page: number
  page_count: number
  page_result: Array<{
    bank_account_id: string
    name: string
    bank: Bank
    agency_number: string
    account_number: string
    transactions: []
    created_at: Date
    updated_at: Date
  }>
  total_count: number
  total_pages: number
}

@UseCaseErrorHandlerDecorator()
@UseCaseAuthDecorator()
export class FindAllBankAccountsUseCase implements IFindAllBankAccountsUseCase {
  constructor(private readonly http: HttpClient) {}

  async execute(
    input: IFindAllBankAccountsUseCase.Input,
  ): Promise<HttpClient.Output<IFindAllBankAccountsUseCase.Output>> {
    const response = await this.http.on<FindAllReturn>({
      url: process.env.BASE_API_URL + `/bank-accounts`,
      method: 'GET',
      params: {
        page: input.page,
        page_size: input.pageSize,
      },
      headers: {
        Authorization: input.Authorization,
      },
    })

    if (response.error || !response.data) {
      return {
        status: response.status,
        error: response.error,
      }
    }

    return {
      status: response.status,
      data: {
        page: response.data.page,
        pageCount: response.data.page_count,
        pageResult: response.data.page_result.map((bankAccount) => ({
          bankAccountId: bankAccount.bank_account_id,
          name: bankAccount.name,
          bank: bankAccount.bank,
          agencyNumber: bankAccount.agency_number,
          accountNumber: bankAccount.account_number,
          transactions: bankAccount.transactions,
          createdAt: bankAccount.created_at,
          updatedAt: bankAccount.updated_at,
        })),
        totalCount: response.data.total_count,
        totalPages: response.data.total_pages,
      },
    }
  }
}
