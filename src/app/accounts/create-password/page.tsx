import React from 'react'

import { Metadata } from 'next'

import { Logo } from '@/presentation/components/shared'
import { Form } from '@/presentation/components/pages/accounts/create-password'

export const metadata: Metadata = {
  title: 'Criar Senha | F3Finance',
}

type CreatePasswordPageParams = {
  searchParams: Promise<{
    token: string
  }>
}

export default async function CreatePasswordPage({
  searchParams,
}: CreatePasswordPageParams) {
  const { token } = await searchParams

  return (
    <>
      <header className="flex items-center justify-center">
        <Logo />
      </header>

      <div className="mt-10 flex flex-col gap-5">
        <h1 className="text-4xl leading-14 font-bold">Crie sua senha</h1>
        <p className="text-lg text-gray-400">
          Quase lá! Crie uma senha segura e finalize seu acesso ao sistema
        </p>
      </div>

      <Form authToken={token} />
    </>
  )
}
