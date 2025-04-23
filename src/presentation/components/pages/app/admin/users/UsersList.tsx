import React from 'react'

import { Trash } from '@phosphor-icons/react/dist/ssr'

import { Table } from '@/presentation/components/shared'

import { InviteUser } from './InviteUser'

export function UsersList() {
  return (
    <section className="bg-white p-5">
      <header className="flex items-center justify-between">
        <strong className="text-lg leading-[150%] font-semibold text-gray-500">
          Usuários
        </strong>

        <InviteUser />
      </header>

      <div className="max-w-[calc(100vw_-_2.75rem_*_2)] overflow-x-auto sm:max-w-full">
        <Table.Root className="w-full text-nowrap">
          <thead>
            <tr>
              <Table.Head className="pr-0">E-mail</Table.Head>
              <Table.Head>Data de Início</Table.Head>
              <Table.Head className="text-right" />
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 2 }).map((_, index) => (
              <Table.Row key={index}>
                <Table.Cell className="pr-0 md:w-64">
                  exemplo@gmail.com
                </Table.Cell>
                <Table.Cell className="md:w-64">1 de Julho de 2022</Table.Cell>
                <Table.Cell className="text-right">
                  <button type="button" className="group cursor-pointer">
                    <Trash className="h-5 w-5 text-gray-400 transition-colors group-hover:text-gray-500 md:h-6 md:w-6" />
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </tbody>
        </Table.Root>
      </div>
    </section>
  )
}
