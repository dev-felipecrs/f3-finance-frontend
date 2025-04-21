'use server'
import { cookies } from 'next/headers'

export const getCookie = async <T = any>(
  key: string,
): Promise<{ name: string; value: T | null }> => {
  const store = await cookies()
  const data = store.get(key)

  if (!data?.value) {
    return {
      name: key,
      value: null,
    }
  }

  return {
    name: key,
    value: JSON.parse(data.value),
  }
}
