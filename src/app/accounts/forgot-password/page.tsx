import React from 'react'

import { Metadata } from 'next'

import { Logo } from '@/presentation/components/shared'
import { Form } from '@/presentation/components/pages/accounts/forgot-password'

export const metadata: Metadata = {
  title: 'Esqueci minha senha',
}

export default function ForgotPasswordPage() {
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
          Esqueceu sua senha?
        </h1>

        <p className="text-sm tracking-[-0.02em] text-gray-400 md:text-lg">
          Sem problemas! Digite seu e-mail e enviaremos um link para você criar
          uma nova senha.
        </p>
      </div>

      <Form />
    </>
  )
}
