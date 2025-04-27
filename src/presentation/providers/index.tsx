import React from 'react'

import { ReactQueryProvider } from './react-query-provider'

interface ProviderProps {
  children: React.ReactNode
}

export function Provider({ children }: ProviderProps) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>
}
