import React from 'react'

import Link from 'next/link'

import { Button, Input, Logo } from '@/presentation/components/shared'

export default function LoginPage() {
  return (
    <>
      <header className="flex items-center justify-center">
        <Logo />
      </header>

      <div className="flex flex-col gap-5">
        <h1 className="text-4xl leading-14 font-bold">Bem-vindo de volta!</h1>
        <p className="text-lg text-gray-400">
          Estamos prontos para te ajudar a gerenciar suas finanças. Faça login e
          vamos lá!
        </p>
      </div>

      <form className="mt-8 flex flex-col gap-8">
        <Input.Root>
          <Input.Label htmlFor="email">E-mail</Input.Label>

          <Input.Input
            id="email"
            type="email"
            placeholder="seu_email@exemplo.com"
          />
        </Input.Root>

        <Input.Root>
          <Input.Label htmlFor="password">Senha</Input.Label>

          <Input.Input
            id="password"
            type="password"
            placeholder="SuaSenha#123"
          />
        </Input.Root>

        <Link
          href="/accounts/forgot-password"
          className="text-primary-600 hover:text-primary-800 text-right text-sm leading-5 font-medium transition-all"
        >
          Esqueceu sua senha?
        </Link>

        <Button>Entrar</Button>
      </form>
    </>
  )
}
