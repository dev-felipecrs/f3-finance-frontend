'use client'
import React from 'react'

import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Input } from '@/presentation/components/shared'
import { revalidatePage } from '@/presentation/actions/revalidate-page'
import { SonnerAdapter } from '@/infra/toast'
import { makeResetPasswordUseCase } from '@/infra/factories/auth'

const LoginSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas precisam ser iguais',
  })

interface FormProps {
  token: string
}

export function Form({ token }: FormProps) {
  const router = useRouter()

  const { toast } = new SonnerAdapter()

  const { control, handleSubmit, register, formState } = useForm<
    z.infer<typeof LoginSchema>
  >({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    const resetPasswordUseCase = makeResetPasswordUseCase()
    const response = await resetPasswordUseCase.execute({
      password: data.password,
      token,
    })

    if (!response.data) {
      return toast({
        text: response.error?.message || '',
        status: 'error',
      })
    }

    toast({
      text: 'Senha alterado com êxito',
      status: 'success',
    })

    await revalidatePage('/accounts/login')

    router.push('/accounts/login')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 flex flex-col gap-8"
    >
      <Controller
        control={control}
        name="password"
        defaultValue=""
        render={({ field }) => (
          <Input.Root>
            <Input.Label htmlFor="password">Senha</Input.Label>

            <Input.Input
              id="password"
              type="password"
              placeholder="SuaSenha#123"
              {...field}
            />
            <Input.Description>
              Mínimo de 8 caracteres, com uma letra maiúscula, minúscula, número
              e caracter especial
            </Input.Description>
            <Input.PasswordStrength value={field.value} />

            {formState.errors.password && (
              <Input.ErrorMessage>
                {formState.errors.password.message}
              </Input.ErrorMessage>
            )}
          </Input.Root>
        )}
      />

      <Input.Root>
        <Input.Label htmlFor="password">Confirme sua senha</Input.Label>

        <Input.Input
          id="confirmPassword"
          type="password"
          placeholder="SuaSenha#123"
          {...register('confirmPassword')}
        />

        {formState.errors.confirmPassword && (
          <Input.ErrorMessage>
            {formState.errors.confirmPassword.message}
          </Input.ErrorMessage>
        )}
      </Input.Root>

      <Button.Root type="submit" isLoading={formState.isSubmitting}>
        <Button.Text>Entrar</Button.Text>
      </Button.Root>
    </form>
  )
}
