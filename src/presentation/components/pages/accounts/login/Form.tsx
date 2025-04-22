'use client'
import React from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'

import { AUTHENTICATED_USER_COOKIE_KEY } from '@/presentation/constants'
import { Button, Input } from '@/presentation/components/shared'
import { revalidatePage, setCookie } from '@/presentation/actions'
import { SonnerAdapter } from '@/infra/toast'
import { makeGetUserByEmailUseCase } from '@/infra/factories/users'
import { makeSignInUseCase } from '@/infra/factories/auth'
import { DateFnsAdapter } from '@/infra/date'
import { UserCookiePayload } from '@/domain/models'

const LoginSchema = z.object({
  email: z.string().email({
    message: 'E-mail inválido',
  }),
  password: z.string(),
})

export function Form() {
  const router = useRouter()

  const { add } = new DateFnsAdapter()
  const { toast } = new SonnerAdapter()

  const { handleSubmit, register, formState } = useForm<
    z.infer<typeof LoginSchema>
  >({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    const signInUseCase = makeSignInUseCase()

    const sign = await signInUseCase.execute({
      email: data.email,
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

    const getUserByEmailUseCase = makeGetUserByEmailUseCase()
    const user = await getUserByEmailUseCase.execute({
      email: data.email,
    })

    if (!user.data) {
      return toast({
        text: user.error?.message || '',
        status: 'error',
      })
    }

    const authenticatedUserCookiePayload: UserCookiePayload = {
      userId: user.data.userId,
      roles: user.data.roles,
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

        <Input.Input
          id="password"
          type="password"
          placeholder="SuaSenha#123"
          {...register('password')}
        />

        {formState.errors.password && (
          <Input.ErrorMessage>
            {formState.errors.password.message}
          </Input.ErrorMessage>
        )}
      </Input.Root>

      <Link
        href="/accounts/forgot-password"
        className="text-primary-600 hover:text-primary-800 text-right text-sm leading-5 font-medium transition-all"
      >
        Esqueceu sua senha?
      </Link>

      <Button.Root type="submit" isLoading={formState.isSubmitting}>
        <Button.Text>Entrar</Button.Text>
      </Button.Root>
    </form>
  )
}
