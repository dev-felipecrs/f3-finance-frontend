import React from 'react'

import { Table } from '@/presentation/components/shared'

interface BankAccountsTableProps {
  children: React.ReactNode
}

export function BankAccountsTable({ children }: BankAccountsTableProps) {
  return (
    <div className="max-w-[calc(100vw_-_2.75rem_*_2)] overflow-x-auto sm:max-w-full">
      <Table.Root className="w-full text-nowrap">
        <thead>
          <tr>
            <Table.Head>Nome</Table.Head>
            <Table.Head>Agência</Table.Head>
            <Table.Head>Conta</Table.Head>
            <Table.Head>Banco</Table.Head>
            <Table.Head className="text-right" />
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </Table.Root>
    </div>
  )
}
