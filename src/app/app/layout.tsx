import React from 'react'

import { Sidebar } from '@/presentation/components/shared'

export default function LayoutApp({ children }: React.PropsWithChildren) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      {children}
    </div>
  )
}
