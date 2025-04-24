import {
  UseCaseAuthDecorator,
  UseCaseErrorHandlerDecorator,
} from '@/presentation/decorators'
import { IFindAllUsersUseCase } from '@/domain/use-cases/users'
import { UserRole } from '@/domain/entities'
import { HttpClient } from '@/data/protocols/http'

type FindAllReturn = {
  page: number
  page_count: number
  page_result: Array<{
    user_id: string
    email: string
    roles: UserRole[]
    updated_at: Date
    created_at: Date
  }>
  total_count: number
  total_pages: number
}

@UseCaseErrorHandlerDecorator()
@UseCaseAuthDecorator()
export class FindAllUsersUseCase implements IFindAllUsersUseCase {
  constructor(private readonly http: HttpClient) {}

  async execute(
    input: IFindAllUsersUseCase.Input,
  ): Promise<HttpClient.Output<IFindAllUsersUseCase.Output>> {
    const response = await this.http.on<FindAllReturn>({
      url: process.env.BASE_API_URL + `/users`,
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
        pageResult: response.data.page_result.map((user) => ({
          userId: user.user_id,
          email: user.email,
          roles: user.roles,
          createdAt: user.created_at,
          updatedAt: user.updated_at,
        })),
        totalCount: response.data.total_count,
        totalPages: response.data.total_pages,
      },
    }
  }
}
