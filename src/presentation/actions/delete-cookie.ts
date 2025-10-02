'use server'
import { cookies } from 'next/headers'

export const deleteCookie = async <T>(
  key: string,
): Promise<{ name: string; value: T | null }> => {
  const store = await cookies()

  store.delete(key)

  return {
    name: key,
    value: null,
  }
}