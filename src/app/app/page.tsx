import React from 'react'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function Page() {
  return (
    <div className="bg-light-mode h-full w-full">
      <h1>Page</h1>
    </div>
  )
}
