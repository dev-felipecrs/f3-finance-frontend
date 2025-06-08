import {
  UseCaseAuthDecorator,
  UseCaseErrorHandlerDecorator,
} from '@/presentation/decorators'
import { INotifyImportationUseCase } from '@/domain/use-cases/transactions'
import { HttpClient } from '@/data/protocols/http'

type FindAllReturn = {
  url: string
}

@UseCaseErrorHandlerDecorator()
@UseCaseAuthDecorator()
export class NotifyImportationUseCase implements INotifyImportationUseCase {
  constructor(private readonly http: HttpClient) {}

  async execute(
    input: INotifyImportationUseCase.Input,
  ): Promise<HttpClient.Output<INotifyImportationUseCase.Output>> {
    const response = await this.http.on<FindAllReturn>({
      url: process.env.BASE_API_URL + `/transactions/imports/notify`,
      method: 'POST',
      body: {
        file_bucket_path: input.fileBucketPath,
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
      data: null,
    }
  }
}
