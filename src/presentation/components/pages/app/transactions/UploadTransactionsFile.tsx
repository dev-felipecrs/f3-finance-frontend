'use client'
import React, { useState } from 'react'

import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { usePathname } from 'next/navigation'
import { Plus } from '@phosphor-icons/react/dist/ssr'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Button,
  Dialog,
  DropzoneFile,
  Input,
  Select,
} from '@/presentation/components/shared'
import { revalidatePage } from '@/presentation/actions'
import { SonnerAdapter } from '@/infra/toast'
import {
  makeGetPresignedUrlUseCase,
  makeNotifyImportationUseCase,
} from '@/infra/factories/transactions'
import { BankAccount } from '@/domain/entities'

interface UploadTransactionsFileProps {
  bankAccounts: BankAccount[]
}

const UploadTransactionsSchema = z.object({
  bankAccountId: z.string().min(1, { message: 'Campo obrigatório' }),
  month: z.string(),
  file: z
    .instanceof(File, { message: 'Arquivo obrigatório' })
    .refine((file) => file.size > 0, {
      message: 'Arquivo não pode estar vazio',
    }),
})

export function UploadTransactionsFile({
  bankAccounts,
}: UploadTransactionsFileProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const pathname = usePathname()

  const { control, handleSubmit, register, reset, formState } = useForm<
    z.infer<typeof UploadTransactionsSchema>
  >({
    resolver: zodResolver(UploadTransactionsSchema),
  })

  const { toast } = new SonnerAdapter()

  const bankAccountsOptions = bankAccounts.map((bankAccount) => ({
    value: bankAccount.bankAccountId,
    label: bankAccount.name,
  }))

  const onSubmit = async (data: z.infer<typeof UploadTransactionsSchema>) => {
    try {
      const getPresignedUrlUseCase = makeGetPresignedUrlUseCase()
      const notifyImportationUseCase = makeNotifyImportationUseCase()

      const [year, month] = data.month.split('-')

      const response = await getPresignedUrlUseCase.execute({
        bankAccountId: data.bankAccountId,
        filename: data.file.name,
        month: Number(month),
        year: Number(year),
      })

      if (!response.data) {
        return toast({
          text: response.error?.message || '',
          status: 'error',
        })
      }

      const { url } = response.data

      await fetch(url, {
        method: 'PUT',
        body: data.file,
        headers: {
          'Content-Type': data.file.type,
        },
      })

      const [fileBucketPath] = url.split('?')

      await notifyImportationUseCase.execute({
        fileBucketPath,
      })

      toast({
        text: 'Planilha enviada com êxito',
        status: 'success',
      })

      await revalidatePage(pathname)

      setDialogIsOpen(false)
      reset()
    } catch {
      toast({
        text: 'Um erro inesperado ocorreu',
        status: 'error',
      })
    }
  }

  return (
    <Dialog.Root open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <Dialog.Trigger>
        <Button.Root className="h-9 py-2.5 md:h-14 md:py-3">
          <Plus className="h-3 w-3 text-white md:h-4 md:w-4" />
          <Button.Text>Enviar</Button.Text>
        </Button.Root>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay />

        <Dialog.Content
          title="Enviar planilha"
          className="w-[calc(100vw_-_2rem)] p-8 md:w-1/2 lg:w-1/3"
        >
          <header className="mb-4">
            <span className="text-lg leading-[150%] font-semibold text-gray-500">
              Enviar planilha
            </span>
          </header>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <Select.Root>
              <Select.Label htmlFor="bankAccountId">
                Conta Bancária
              </Select.Label>

              <Controller
                control={control}
                name="bankAccountId"
                render={({ field }) => (
                  <Select.Field
                    inputId="bankAccount"
                    placeholder="Selecione a conta bancária"
                    options={bankAccountsOptions}
                    value={bankAccountsOptions.find(
                      (option) => option.value === field.value,
                    )}
                    onChange={({ value }: any) => field.onChange(value)}
                  />
                )}
              />

              {formState.errors.bankAccountId && (
                <Select.ErrorMessage>
                  {formState.errors.bankAccountId.message}
                </Select.ErrorMessage>
              )}
            </Select.Root>

            <Input.Root>
              <Input.Label htmlFor="month">Mês</Input.Label>

              <Input.Input id="month" type="month" {...register('month')} />

              {formState.errors.month && (
                <Input.ErrorMessage>
                  {formState.errors.month.message}
                </Input.ErrorMessage>
              )}
            </Input.Root>

            <Controller
              control={control}
              name="file"
              render={({ field }) => (
                <DropzoneFile
                  id="file"
                  value={field.value as any}
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null
                    if (file) field.onChange(file)
                  }}
                />
              )}
            />

            <footer className="mt-8 flex items-center justify-end">
              <Button.Root type="submit" isLoading={formState.isSubmitting}>
                <Button.Text>Enviar</Button.Text>
              </Button.Root>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
