import {
  UseCaseAuthDecorator,
  UseCaseErrorHandlerDecorator,
} from '@/presentation/decorators'
import { IFindAllTransactionsUseCase } from '@/domain/use-cases/transactions'
import { TransactionType } from '@/domain/entities'
import { HttpClient } from '@/data/protocols/http'

type FindAllReturn = {
  page: number
  page_count: number
  page_result: Array<{
    transaction_id: string
    bank_account_id: string
    amount: number
    transaction_type: TransactionType
    transacted_at: Date
    created_at: Date
    updated_at: Date
  }>
  total_count: number
  total_pages: number
}

@UseCaseErrorHandlerDecorator()
@UseCaseAuthDecorator()
export class FindAllTransactionsUseCase implements IFindAllTransactionsUseCase {
  constructor(private readonly http: HttpClient) {}

  async execute(
    input: IFindAllTransactionsUseCase.Input,
  ): Promise<HttpClient.Output<IFindAllTransactionsUseCase.Output>> {
    const response = await this.http.on<FindAllReturn>({
      url: process.env.BASE_API_URL + `/transactions`,
      method: 'GET',
      params: {
        page: input.page,
        page_size: input.pageSize,
        ...input.filters,
      },
      headers: {
        Authorization: input.Authorization,
      },
      revalidate: 60 * 60 * 1, // 1 hour
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
        pageResult: response.data.page_result.map((transaction) => ({
          transactionId: transaction.transaction_id,
          bankAccountId: transaction.bank_account_id,
          amount: transaction.amount,
          transactionType: transaction.transaction_type,
          transactedAt: transaction.transacted_at,
          createdAt: transaction.created_at,
          updatedAt: transaction.updated_at,
        })),
        totalCount: response.data.total_count,
        totalPages: response.data.total_pages,
      },
    }
  }
}
