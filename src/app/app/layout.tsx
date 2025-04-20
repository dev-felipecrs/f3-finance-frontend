import React from 'react'

import { Header, Sidebar } from '@/presentation/components/shared'

export default function LayoutApp({ children }: React.PropsWithChildren) {
  return (
    <main className="bg-light-mode flex h-screen w-screen">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <div className="p-6">{children}</div>
      </div>
    </main>
  )
}
