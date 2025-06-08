import {
  UseCaseAuthDecorator,
  UseCaseErrorHandlerDecorator,
} from '@/presentation/decorators'
import { IGetPresignedUrlUseCase } from '@/domain/use-cases/transactions'
import { HttpClient } from '@/data/protocols/http'

type FindAllReturn = {
  url: string
}

@UseCaseErrorHandlerDecorator()
@UseCaseAuthDecorator()
export class GetPresignedUrlUseCase implements IGetPresignedUrlUseCase {
  constructor(private readonly http: HttpClient) {}

  async execute(
    input: IGetPresignedUrlUseCase.Input,
  ): Promise<HttpClient.Output<IGetPresignedUrlUseCase.Output>> {
    const response = await this.http.on<FindAllReturn>({
      url: process.env.BASE_API_URL + `/transactions/imports/presigned-url`,
      method: 'POST',
      body: {
        bank_account_id: input.bankAccountId,
        filename: input.filename,
        month: input.month,
        year: input.year,
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
        url: response.data.url,
      },
    }
  }
}
