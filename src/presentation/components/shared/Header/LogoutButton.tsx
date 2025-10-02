'use client'
import React, { useState } from 'react'

import { useRouter } from 'next/navigation'
import { User } from '@phosphor-icons/react/dist/ssr'

import { AUTHENTICATED_USER_COOKIE_KEY } from '@/presentation/constants'
import { Button, Dialog } from '@/presentation/components/shared'
import { deleteCookie } from '@/presentation/actions/delete-cookie'
import { SonnerAdapter } from '@/infra/toast'

export function LogoutButton() {
  const router = useRouter()

  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const { toast } = new SonnerAdapter()

  const onSubmit = async () => {
    await deleteCookie(AUTHENTICATED_USER_COOKIE_KEY)

    toast({
      text: 'Sessão encerrada',
      status: 'success',
    })

    router.push('/accounts/login')

    setDialogIsOpen(false)
  }

  return (
    <Dialog.Root open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <Dialog.Trigger>
        <button className="flex h-16 w-16 items-center justify-center rounded-lg border border-gray-200 bg-white p-[1.125rem] transition-all hover:brightness-95">
          <User
            size={24}
            className="h-5 w-5 text-gray-400 transition-colors group-hover:text-gray-500 md:h-6 md:w-6"
          />
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
              Tem certeza que deseja encerrar a sessão?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Esta ação não pode ser desfeita.
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
              <Button.Text>Encerrar</Button.Text>
            </Button.Root>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
