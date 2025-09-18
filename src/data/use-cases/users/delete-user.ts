import {
  UseCaseAuthDecorator,
  UseCaseErrorHandlerDecorator,
} from '@/presentation/decorators'
import { IDeleteUserUseCase } from '@/domain/use-cases/users'

import { HttpClient } from '@/data/protocols/http'

type DeleteUserReturn = {}

@UseCaseErrorHandlerDecorator()
@UseCaseAuthDecorator()
export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(private readonly http: HttpClient) {}

  async execute(
    input: IDeleteUserUseCase.Input,
  ): Promise<HttpClient.Output<IDeleteUserUseCase.Output>> {
    const response = await this.http.on<DeleteUserReturn>({
      url: process.env.BASE_API_URL + `/users/${input.userId}`,
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
