export interface HttpClient {
  on<T>(input: HttpClient.Input): Promise<HttpClient.Output<T>>
}

export namespace HttpClient {
  export type Input = {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    url: string
    body?: any
    headers?: any
    params?: Record<string, any>
    revalidate?: number
  }

  export type Output<T> = {
    status: number
    data?: T
    error?: {
      code: string
      message: string
      details?: string
    }
  }
}
