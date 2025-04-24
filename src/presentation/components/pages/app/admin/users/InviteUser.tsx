'use client'
import React, { useState } from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { Plus } from '@phosphor-icons/react/dist/ssr'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Dialog, Input } from '@/presentation/components/shared'
import { SonnerAdapter } from '@/infra/toast'
import { makeInviteUserUseCase } from '@/infra/factories/users'

const InviteUserSchema = z.object({
  email: z.string().email({
    message: 'E-mail inválido',
  }),
})

export function InviteUser() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const { toast } = new SonnerAdapter()

  const { handleSubmit, register, formState } = useForm<
    z.infer<typeof InviteUserSchema>
  >({
    resolver: zodResolver(InviteUserSchema),
  })

  const onSubmit = async (data: z.infer<typeof InviteUserSchema>) => {
    const inviteUserUseCase = makeInviteUserUseCase()

    const response = await inviteUserUseCase.execute({
      email: data.email,
      roles: ['user'],
    })

    if (!response.data) {
      return toast({
        text: response.error?.message || '',
        status: 'error',
      })
    }

    toast({
      text: 'Usuário convidado',
      status: 'success',
    })

    await queryClient.refetchQueries({
      queryKey: ['users'],
    })

    setDialogIsOpen(false)
  }

  return (
    <Dialog.Root open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <Dialog.Trigger>
        <Button.Root className="h-9 py-2.5 md:h-14 md:py-3">
          <Plus className="h-3 w-3 text-white md:h-4 md:w-4" />
          <Button.Text>Adicionar</Button.Text>
        </Button.Root>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay />

        <Dialog.Content
          title="Convidar usuário"
          className="w-[calc(100vw_-_2rem)] p-8 md:w-1/2 lg:w-1/3"
        >
          <header className="mb-4">
            <span className="text-lg leading-[150%] font-semibold text-gray-500">
              Convidar usuário
            </span>
          </header>

          <form onSubmit={handleSubmit(onSubmit)}>
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

            <footer className="mt-8 flex items-center justify-end">
              <Button.Root type="submit" isLoading={formState.isSubmitting}>
                <Button.Text>Convidar</Button.Text>
              </Button.Root>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
