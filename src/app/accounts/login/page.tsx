import React from 'react'

import { Logo } from '@/presentation/components/shared'
import { Form } from '@/presentation/components/pages/accounts/login'

export default function LoginPage() {
  return (
    <>
      <header className="flex items-center justify-center">
        <div className="block md:hidden">
          <Logo size="sm" />
        </div>
        <div className="hidden md:block">
          <Logo size="lg" />
        </div>
      </header>

      <div className="mt-4 flex flex-col gap-2 md:mt-10 md:gap-5">
        <h1 className="text-2xl leading-14 font-bold md:text-4xl">
          Bem-vindo de volta!
        </h1>
        <p className="text-sm text-gray-400 md:text-lg">
          Estamos prontos para te ajudar a organizar suas finanças. Faça login e
          vamos lá!
        </p>
      </div>

      <Form />
    </>
  )
}
