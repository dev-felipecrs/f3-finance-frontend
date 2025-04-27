import React from 'react'

import { Metadata } from 'next'

import { Logo } from '@/presentation/components/shared'
import { Form } from '@/presentation/components/pages/accounts/reset-password'

export const metadata: Metadata = {
  title: 'Mudar Senha',
}

interface LoginPageProps {
  searchParams: Promise<{
    token: string
  }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { token } = await searchParams

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
          Redefinir senha
        </h1>

        <p className="text-sm tracking-[-0.02em] text-gray-400 md:text-lg">
          Quase lá! Crie uma nova senha para recuperar o acesso à sua conta.
        </p>
      </div>

      <Form token={token} />
    </>
  )
}
