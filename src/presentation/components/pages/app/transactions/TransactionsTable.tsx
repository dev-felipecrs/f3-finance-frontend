import React from 'react'

import { Table } from '@/presentation/components/shared'

interface TransactionsTableProps {
  children: React.ReactNode
}

export function TransactionsTable({ children }: TransactionsTableProps) {
  return (
    <div className="max-w-[calc(100vw_-_2.75rem_*_2)] overflow-x-auto sm:max-w-full">
      <Table.Root className="w-full text-nowrap">
        <thead>
          <tr>
            <Table.Head>Receita/Despesa</Table.Head>
            <Table.Head>Valor</Table.Head>
            <Table.Head>Transacionado em</Table.Head>
            <Table.Head className="text-right" />
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </Table.Root>
    </div>
  )
}
