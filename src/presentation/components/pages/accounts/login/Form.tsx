'use client'
import React from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Input } from '@/presentation/components/shared'

const LoginSchema = z.object({
  email: z.string().email({
    message: 'E-mail inválido',
  }),
  password: z.string(),
})

export function Form() {
  const { handleSubmit, register, formState } = useForm<
    z.infer<typeof LoginSchema>
  >({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    console.log({ data })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 flex flex-col gap-8"
    >
      <Input.Root>
        <Input.Label htmlFor="email">E-mail</Input.Label>

        <Input.Input
          id="email"
          type="email"
          placeholder="seu_email@exemplo.com"
          {...register('email')}
        />

        {formState.errors.email && (
          <Input.ErrorMessage>
            {formState.errors.email.message}
          </Input.ErrorMessage>
        )}
      </Input.Root>

      <Input.Root>
        <Input.Label htmlFor="password">Senha</Input.Label>

        <Input.Input id="password" type="password" placeholder="SuaSenha#123" />
      </Input.Root>

      <Link
        href="/accounts/forgot-password"
        className="text-primary-600 hover:text-primary-800 text-right text-sm leading-5 font-medium transition-all"
      >
        Esqueceu sua senha?
      </Link>

      <Button.Root type="submit">
        <Button.Text>Entrar</Button.Text>
      </Button.Root>
    </form>
  )
}
