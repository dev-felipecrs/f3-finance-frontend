'use client'
import React, { useState } from 'react'

import { usePathname } from 'next/navigation'
import { Trash } from '@phosphor-icons/react/dist/ssr'

import { Button, Dialog } from '@/presentation/components/shared'
import { revalidatePage } from '@/presentation/actions'
import { SonnerAdapter } from '@/infra/toast'
import { makeDeleteTransactionUseCase } from '@/infra/factories/transactions'
import type { TransactionType } from '@/domain/entities'

import { TRANSACTION_TYPES_MAPPER } from './TransactionsList'

type DeleteTransactionProps = {
  transactionId: string
  transactionType: TransactionType
}

export function DeleteTransaction({
  transactionId,
  transactionType,
}: DeleteTransactionProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const pathname = usePathname()

  const { toast } = new SonnerAdapter()

  const onSubmit = async () => {
    try {
      const deleteTransactionUseCase = makeDeleteTransactionUseCase()

      const response = await deleteTransactionUseCase.execute({
        transactionId,
      })

      if (!response.data) {
        setDialogIsOpen(false)

        return toast({
          text: response.error?.message || '',
          status: 'error',
        })
      }

      toast({
        text: 'Transação deletada',
        status: 'success',
      })

      await revalidatePage(pathname)

      setDialogIsOpen(false)
    } catch (error) {
      if (error instanceof Error) {
        toast({
          text: error.message,
          status: 'error',
        })
      } else {
        toast({
          text: 'Erro ao deletar transação',
          status: 'error',
        })
      }

      setDialogIsOpen(false)
    }
  }

  return (
    <Dialog.Root open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <Dialog.Trigger>
        <button type="button" className="group cursor-pointer">
          <Trash className="h-5 w-5 text-gray-400 transition-colors group-hover:text-gray-500 md:h-6 md:w-6" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay />

        <Dialog.Content
          title="Deletar usuário"
          className="w-[calc(100vw_-_2rem)] p-8 md:w-1/2 lg:w-1/3"
        >
          <header className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Deletar transação
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Você está prestes a deletar uma transação do tipo{' '}
              <span className="font-medium text-gray-800">
                {TRANSACTION_TYPES_MAPPER[transactionType]}
              </span>
              . Essa ação é{' '}
              <span className="font-semibold text-red-600">irreversível</span> e
              todos os dados relacionados a esta transação serão permanentemente
              removidos. Tem certeza que deseja continuar?
            </p>
          </header>

          <footer className="mt-8 flex items-center justify-end gap-2">
            <Button.Root
              type="button"
              onClick={() => setDialogIsOpen(false)}
              className="bg-gray-100 text-gray-500 hover:bg-gray-200"
            >
              <Button.Text className="text-gray-400 hover:text-gray-500">
                Cancelar
              </Button.Text>
            </Button.Root>

            <Button.Root
              type="button"
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={onSubmit}
            >
              <Button.Text>Deletar</Button.Text>
            </Button.Root>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
