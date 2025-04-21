'use server'
import { cookies } from 'next/headers'
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'

type Input = {
  name: string
  value: any
  options?: Omit<Partial<ResponseCookie>, 'name' | 'value'>
}

type Output<T> = {
  name: string
  value: T
}

export const setCookie = async <T = any>({
  name,
  value,
  options,
}: Input): Promise<Output<T>> => {
  const store = await cookies()

  const set = () => {
    store.set({
      name,
      value: JSON.stringify(value),
      ...options,
    })

    return { name, value }
  }

  const [cookie] = await Promise.all([set()])

  return cookie
}
