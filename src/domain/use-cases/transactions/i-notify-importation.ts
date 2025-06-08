import { HttpClient } from '@/data/protocols/http'

export interface INotifyImportationUseCase {
  execute(
    input: INotifyImportationUseCase.Input,
  ): Promise<HttpClient.Output<INotifyImportationUseCase.Output>>
}

export namespace INotifyImportationUseCase {
  export type Input = {
    fileBucketPath: string
    Authorization?: string
  }

  export type Output = null
}
