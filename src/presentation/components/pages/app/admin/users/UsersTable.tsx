'use client'
import React from 'react'

import { Table } from '@/presentation/components/shared'

interface UsersListProps {
  children: React.ReactNode
}

export function UsersTable({ children }: UsersListProps) {
  return (
    <div className="max-w-[calc(100vw_-_2.75rem_*_2)] overflow-x-auto sm:max-w-full">
      <Table.Root className="w-full text-nowrap">
        <thead>
          <tr>
            <Table.Head>E-mail</Table.Head>
            <Table.Head>Data de Início</Table.Head>
            <Table.Head className="text-right" />
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </Table.Root>
    </div>
  )
}
