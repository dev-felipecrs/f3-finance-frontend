'use client'
import React from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { AUTHENTICATED_USER_COOKIE_KEY } from '@/presentation/constants'
import { Button, Input } from '@/presentation/components/shared'
import { revalidatePage, setCookie } from '@/presentation/actions'
import { SonnerAdapter } from '@/infra/toast'
import { makeGetUserByEmailUseCase } from '@/infra/factories/users'
import { makeSignInUseCase } from '@/infra/factories/auth'
import { DateFnsAdapter } from '@/infra/date'
import { UserCookiePayload } from '@/domain/models'
import { InputDescription } from '@/presentation/components/shared/Input/Description'
import { InputPasswordStrength } from '@/presentation/components/shared/Input/PasswordStrength'

const LoginSchema = z.object({
  email: z.string().email({
    message: 'E-mail inválido',
  }),
  password: z.string(),
  confirmPassword: z.string()
})

export function Form() {
  const router = useRouter()
  const { add } = new DateFnsAdapter()
  const { toast } = new SonnerAdapter()

  const { handleSubmit, register, formState, watch } = useForm<
    z.infer<typeof LoginSchema>
  >({
    resolver: zodResolver(LoginSchema),
  })

  const passwordValue = watch('password')
  const confirmPasswordValue = watch('confirmPassword')

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    if (passwordValue) {
      
    }

    await revalidatePage('/app')

    router.push('/app')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 flex flex-col gap-8"
    >
      <Input.Root>
        <Input.Label htmlFor="password">Senha</Input.Label>

        <Input.Input
          id="password"
          type="password"
          placeholder="SuaSenha#123"
          {...register('password')}
        />
        <InputDescription>Mínimo de 8 caracteres, com uma letra maiúscula, minúscula, número e caracter especial</InputDescription>
        <InputPasswordStrength value={passwordValue}></InputPasswordStrength>

        {formState.errors.password && (
          <Input.ErrorMessage>
            {formState.errors.password.message}
          </Input.ErrorMessage>
        )}
      </Input.Root>

      <Input.Root>
        <Input.Label htmlFor="password">Confirme sua senha</Input.Label>

        <Input.Input
          id="confirmPassword"
          type="password"
          placeholder="SuaSenha#123"
        />

        {formState.errors.password && (
          <Input.ErrorMessage>
            {formState.errors.password.message}
          </Input.ErrorMessage>
        )}
      </Input.Root>

      <Button.Root type="submit" isLoading={formState.isSubmitting}>
        <Button.Text>Entrar</Button.Text>
      </Button.Root>
    </form>
  )
}
