'use client'
import React, { useState } from 'react'

import { usePathname } from 'next/navigation'
import { Trash } from '@phosphor-icons/react/dist/ssr'

import { Button, Dialog, Input } from '@/presentation/components/shared'
import { revalidatePage } from '@/presentation/actions'
import { SonnerAdapter } from '@/infra/toast'
import { makeDeleteUserUseCase } from '@/infra/factories/users'

type DeleteUserProps = {
  userId: string
  email: string
}

export function DeleteUser({
  userId, 
  email
}: DeleteUserProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const pathname = usePathname()

  const { toast } = new SonnerAdapter()

  const onSubmit = async () => {
    const deleteUserUseCase = makeDeleteUserUseCase()

    const response = await deleteUserUseCase.execute({
      userId,
    })

    if (!response.data) {
      setDialogIsOpen(false)

      return toast({
        text: response.error?.message || '',
        status: 'error',
      })
    }

    toast({
      text: 'Usuário deletado',
      status: 'success',
    })

    await revalidatePage(pathname)

    setDialogIsOpen(false)
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
              Tem certeza que deseja deletar este usuário?
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Tem certeza que deseja excluir o usuário com e-mail{" "}
              <span className="font-medium text-gray-800">{email}</span>?
              Esta ação é <span className="font-semibold text-red-600">irreversível</span> {/* */}
              e todos os dados associados serão permanentemente removidos.
            </p>

          </header>

          <footer className="mt-8 flex items-center gap-2 justify-end">
            <Button.Root
              type="button"
              onClick={() => setDialogIsOpen(false)} 
              className='bg-gray-100 hover:bg-gray-200 text-gray-500'
            >
              <Button.Text className='text-gray-400 hover:text-gray-500'>Cancelar</Button.Text>
            </Button.Root>

            <Button.Root
              type="button"
              className="bg-red-600 hover:bg-red-700 text-white"
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
