import React from 'react'

import { Skeleton, Table } from '@/presentation/components/shared'
import { TransactionsTable } from '@/presentation/components/pages/app/transactions'

const PAGE_SIZE = 50

export default async function TransactionsLoadingPage() {
  return (
    <TransactionsTable>
      {Array.from({ length: PAGE_SIZE }).map((_, index) => (
        <Table.Row key={index}>
          <Table.Cell className="pl-0 md:w-64">
            <Skeleton className="h-5 w-full" />
          </Table.Cell>
          <Table.Cell className="md:w-64">
            <Skeleton className="h-5 w-full" />
          </Table.Cell>
          <Table.Cell className="md:w-64">
            <Skeleton className="h-5 w-full" />
          </Table.Cell>
        </Table.Row>
      ))}
    </TransactionsTable>
  )
}
