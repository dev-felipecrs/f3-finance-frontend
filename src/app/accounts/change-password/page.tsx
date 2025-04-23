import React from 'react'

import { Logo } from '@/presentation/components/shared'
import { Form } from '@/presentation/components/pages/accounts/change-password'

export default function LoginPage() {
  return (
    <>
      <header className="flex items-center justify-center">
        <Logo />
      </header>

      <div className="mt-10 flex flex-col gap-5">
        <h1 className="text-4xl leading-14 font-bold">Bem-vindo de volta!</h1>
        <p className="text-lg text-gray-400">
          Estamos prontos para te ajudar a gerenciar suas finanças. Faça login e
          vamos lá!
        </p>
      </div>

      <Form />
    </>
  )
}
