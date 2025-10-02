import {
  UseCaseAuthDecorator,
  UseCaseErrorHandlerDecorator,
} from '@/presentation/decorators'
import type { IDeleteTransactionUseCase } from '@/domain/use-cases/transactions'
import { HttpClient } from '@/data/protocols/http'

type DeleteTransactionReturn = {
  data: null
}

@UseCaseErrorHandlerDecorator()
@UseCaseAuthDecorator()
export class DeleteTransactionUseCase implements IDeleteTransactionUseCase {
  constructor(private readonly http: HttpClient) {}

  async execute(
    input: IDeleteTransactionUseCase.Input,
  ): Promise<HttpClient.Output<IDeleteTransactionUseCase.Output>> {
    const response = await this.http.on<DeleteTransactionReturn>({
      url: process.env.BASE_API_URL + `/transactions/${input.transactionId}`,
      method: 'DELETE',
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
    }
  }
}
