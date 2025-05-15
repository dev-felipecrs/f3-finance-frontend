'use client'
import React from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Input } from '@/presentation/components/shared'
import { SonnerAdapter } from '@/infra/toast'
import { makeForgotPasswordUseCase } from '@/infra/factories/auth'

const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: 'E-mail inválido',
  }),
})

export function Form() {
  const { toast } = new SonnerAdapter()

  const { handleSubmit, register, formState } = useForm<
    z.infer<typeof ForgotPasswordSchema>
  >({
    resolver: zodResolver(ForgotPasswordSchema),
  })

  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    const forgotPasswordUseCase = makeForgotPasswordUseCase()

    const response = await forgotPasswordUseCase.execute({
      email: data.email,
    })

    if (response.error) {
      return toast({
        text: response.error.message,
        status: 'error',
      })
    }

    toast({
      text: 'E-mail enviado com êxito',
      status: 'success',
    })
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

      <Button.Root type="submit" isLoading={formState.isSubmitting}>
        <Button.Text>Enviar e-mail</Button.Text>
      </Button.Root>
    </form>
  )
}
