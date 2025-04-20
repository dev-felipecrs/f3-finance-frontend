import React from 'react'

import { Plus, Trash } from '@phosphor-icons/react/dist/ssr'

import { Button, Table } from '@/presentation/components/shared'

export function UsersList() {
  return (
    <section className="bg-white p-5">
      <header className="flex items-center justify-between">
        <strong className="text-lg leading-[150%] font-semibold text-gray-500">
          Usuários
        </strong>

        <Button.Root>
          <Plus size={16} className="text-white" />
          <Button.Text>Adicionar</Button.Text>
        </Button.Root>
      </header>

      <Table.Root>
        <thead>
          <tr>
            <Table.Head>E-mail</Table.Head>
            <Table.Head>Data de Início</Table.Head>
            <Table.Head className="text-right" />
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 2 }).map((_, index) => (
            <Table.Row key={index}>
              <Table.Cell className="w-64">exemplo@gmail.com</Table.Cell>
              <Table.Cell className="w-64">1 de Julho de 2022</Table.Cell>
              <Table.Cell className="text-right">
                <button type="button" className="group cursor-pointer">
                  <Trash
                    size={24}
                    className="text-gray-400 transition-colors group-hover:text-gray-500"
                  />
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </tbody>
      </Table.Root>
    </section>
  )
}
