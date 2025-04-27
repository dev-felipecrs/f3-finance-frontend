'use client'
import React from 'react'

import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { AUTHENTICATED_USER_COOKIE_KEY } from '@/presentation/constants'
import { Button, Input } from '@/presentation/components/shared'
import { revalidatePage, setCookie } from '@/presentation/actions'
import { SonnerAdapter } from '@/infra/toast'
import {
  makeResetPasswordUseCase,
  makeSignInUseCase,
} from '@/infra/factories/auth'
import { DateFnsAdapter } from '@/infra/date'
import { UserCookiePayload } from '@/domain/models'

const LoginSchema = z
  .object({
    password: z.string().min(8, 'Deve ter no mínimo oito caracteres'),
    confirmPassword: z.string(),
  })
  .refine(({ confirmPassword, password }) => password === confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type FormProps = {
  token: string
}

export function Form({ token }: FormProps) {
  const router = useRouter()

  const { toast } = new SonnerAdapter()
  const { add } = new DateFnsAdapter()

  const { control, handleSubmit, register, formState } = useForm<
    z.infer<typeof LoginSchema>
  >({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    const resetPasswordUseCase = makeResetPasswordUseCase()

    const resetPassword = await resetPasswordUseCase.execute({
      password: data.password,
      token,
    })

    if (!resetPassword.data) {
      return toast({
        text: resetPassword.error?.message || '',
        status: 'error',
      })
    }

    toast({
      text: 'Senha criada com sucesso',
      status: 'success',
    })

    const signInUseCase = makeSignInUseCase()
    const sign = await signInUseCase.execute({
      email: resetPassword.data.email,
      password: data.password,
    })

    if (!sign.data) {
      return toast({
        text: sign.error?.message || '',
        status: 'error',
      })
    }

    const setAuthenticatedUserCookie = async (
      data: UserCookiePayload | Omit<UserCookiePayload, 'userId' | 'roles'>,
    ) => {
      await setCookie({
        name: AUTHENTICATED_USER_COOKIE_KEY,
        value: data,
        options: {
          expires: add(new Date(), { months: 1 }),
        },
      })
    }

    await setAuthenticatedUserCookie({
      accessToken: sign.data.accessToken,
      refreshToken: sign.data.refreshToken,
      expiredAt: add(new Date(), { seconds: sign.data.expiresIn }),
    })

    const authenticatedUserCookiePayload: UserCookiePayload = {
      userId: resetPassword.data.userId,
      roles: resetPassword.data.roles,
      accessToken: sign.data.accessToken,
      refreshToken: sign.data.refreshToken,
      expiredAt: add(new Date(), { seconds: sign.data.expiresIn }),
    }

    await setAuthenticatedUserCookie(authenticatedUserCookiePayload)

    await revalidatePage('/app')

    router.push('/app')
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
        <Input.Label htmlFor="confirm_password">Confirme sua senha</Input.Label>

        <Input.Input
          id="confirm_password"
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
        <Button.Text>Registrar-se</Button.Text>
      </Button.Root>
    </form>
  )
}
