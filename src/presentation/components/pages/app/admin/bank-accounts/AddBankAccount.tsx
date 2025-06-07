'use client'
import React, { useState } from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { Plus } from '@phosphor-icons/react/dist/ssr'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Dialog, Input } from '@/presentation/components/shared'
import { SonnerAdapter } from '@/infra/toast'
import { makeCreateBankCreateBankAccountUseCase } from '@/infra/factories/bank-accounts'
import { Bank } from '@/domain/entities'

const AddBankAccountSchema = z.object({
  name: z.string().min(3, { message: 'Campo obrigatório' }),
  bank: z.nativeEnum(Bank, { message: 'Banco inválido' }),
  agencyNumber: z
    .string()
    .min(3, { message: 'Campo obrigatório' })
    .max(6, { message: 'Máximo de 6 caracteres' }),
  accountNumber: z
    .string()
    .min(3, { message: 'Campo obrigatório' })
    .max(13, { message: 'Máximo de 13 caracteres' }),
})

export function AddBankAccount() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const { toast } = new SonnerAdapter()

  const { handleSubmit, register, formState } = useForm<
    z.infer<typeof AddBankAccountSchema>
  >({
    resolver: zodResolver(AddBankAccountSchema),
  })

  const onSubmit = async (data: z.infer<typeof AddBankAccountSchema>) => {
    const createBankCreateBankAccountUseCase =
      makeCreateBankCreateBankAccountUseCase()

    const response = await createBankCreateBankAccountUseCase.execute({
      name: data.name,
      bank: data.bank,
      agencyNumber: data.agencyNumber,
      accountNumber: data.accountNumber,
    })

    if (!response.data) {
      return toast({
        text: response.error?.message || '',
        status: 'error',
      })
    }

    toast({
      text: 'Conta bancária criada com êxito',
      status: 'success',
    })

    await queryClient.refetchQueries({
      queryKey: ['bank-accounts'],
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
              Criar conta bancária
            </span>
          </header>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Input.Root>
              <Input.Label htmlFor="name">Nome</Input.Label>

              <Input.Input
                id="name"
                placeholder="Nome/apelido da conta bancária"
                {...register('name')}
              />

              {formState.errors.name && (
                <Input.ErrorMessage>
                  {formState.errors.name.message}
                </Input.ErrorMessage>
              )}
            </Input.Root>

            <Input.Root>
              <Input.Label htmlFor="bank">Banco</Input.Label>

              <Input.Input
                id="bank"
                placeholder="Bradesco"
                {...register('bank')}
              />

              {formState.errors.bank && (
                <Input.ErrorMessage>
                  {formState.errors.bank.message}
                </Input.ErrorMessage>
              )}
            </Input.Root>

            <Input.Root>
              <Input.Label htmlFor="agencyNumber">Agência</Input.Label>

              <Input.Input
                id="agencyNumber"
                placeholder="1234"
                {...register('agencyNumber')}
              />

              {formState.errors.agencyNumber && (
                <Input.ErrorMessage>
                  {formState.errors.agencyNumber.message}
                </Input.ErrorMessage>
              )}
            </Input.Root>

            <Input.Root>
              <Input.Label htmlFor="accountNumber">Conta</Input.Label>

              <Input.Input
                id="accountNumber"
                placeholder="123456-7"
                {...register('accountNumber')}
              />

              {formState.errors.accountNumber && (
                <Input.ErrorMessage>
                  {formState.errors.accountNumber.message}
                </Input.ErrorMessage>
              )}
            </Input.Root>

            <footer className="mt-8 flex items-center justify-end">
              <Button.Root
                type="submit"
                onClick={() => console.log(formState.errors)}
                isLoading={formState.isSubmitting}
              >
                <Button.Text>Adicionar</Button.Text>
              </Button.Root>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
