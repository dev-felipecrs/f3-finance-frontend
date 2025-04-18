import React from 'react'

import { Button, Logo } from '@/presentation/components/shared'
import { FormExample } from '@/presentation/components/example/Form'

export default function Home() {
  return (
    <div className="bg-primary-0 min-h-screen">
      <h1 className="text-primary-900 text-4xl">Testing</h1>
      <Logo />
      <Button>Testando</Button>

      <FormExample />
    </div>
  )
}
