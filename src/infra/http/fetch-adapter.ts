import { HttpClient } from '@/data/protocols/http'

export class FetchAdapter implements HttpClient {
  async on<T>(input: HttpClient.Input): Promise<HttpClient.Output<T>> {
    const { method, body, headers = {}, revalidate } = input

    const url = this.getUrl(input)

    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...(body && { body: JSON.stringify(body) }),
      ...(revalidate !== undefined && { next: { revalidate } }),
    }

    const response = await fetch(url, options)

    const contentType = response.headers.get('content-type')
    const isJson = contentType?.includes('application/json')

    const data = isJson ? await response.json() : await response.text()

    if (!response.ok) throw data

    return data
  }

  private getUrl(input: Pick<HttpClient.Input, 'url' | 'params'>) {
    const { url, params } = input

    const queryString = params
      ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
      : ''

    return `${url}${queryString}`
  }
}
