import { User, UserRole } from '@/domain/entities'
import { HttpClient } from '@/data/protocols/http'

export interface IFindAllUsersUseCase {
  execute(
    input: IFindAllUsersUseCase.Input,
  ): Promise<HttpClient.Output<IFindAllUsersUseCase.Output>>
}

export namespace IFindAllUsersUseCase {
  export type Input = {
    page: number
    pageSize: number
    filters: {
      roles?: UserRole[]
    }
    Authorization?: string
  }

  export type Output = {
    page: number
    pageCount: number
    pageResult: User[]
    totalCount: number
    totalPages: number
  }
}
