import React from 'react'

import { Skeleton, Table } from '@/presentation/components/shared'
import { UsersTable } from '@/presentation/components/pages/app/admin/users'

const PAGE_SIZE = 10

export default async function UsersLoadingPage() {
  return (
    <UsersTable>
      {Array.from({ length: PAGE_SIZE }).map((_, index) => (
        <Table.Row key={index}>
          <Table.Cell className="pl-0 md:w-64">
            <Skeleton className="h-5 w-full" />
          </Table.Cell>
          <Table.Cell className="md:w-64">
            <Skeleton className="h-5 w-full" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton className="ml-auto h-5 w-5" />
          </Table.Cell>
        </Table.Row>
      ))}
    </UsersTable>
  )
}
