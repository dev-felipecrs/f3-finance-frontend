import React from 'react'


import { Pagination, Table } from '@/presentation/components/shared'
import { makeFindAllUsersUseCase } from '@/infra/factories/users'
import { DateFnsAdapter } from '@/infra/date'

import { UsersTable } from './UsersTable'
import { DeleteUser } from './DeleteUser'

interface UsersListProps {
  page: number
}

const PAGE_SIZE = 10

export async function UsersList({ page }: UsersListProps) {
  const findAllUsersUseCase = makeFindAllUsersUseCase()
  const data = await findAllUsersUseCase.execute({
    page,
    pageSize: PAGE_SIZE,
    filters: {},
  })
  const users = data.data?.pageResult ?? []

  const { format } = new DateFnsAdapter()

  console.log(users)

  return (
    <>
      <UsersTable>
        {users.map((user) => (
          <Table.Row key={user.userId}>
            <Table.Cell className="pl-2 md:w-64">{user.email}</Table.Cell>
            <Table.Cell className="md:w-64">
              {format(user.createdAt, "dd 'de' MMMM 'de' yyyy")}
            </Table.Cell>
            
            <Table.Cell className="text-right">
              <DeleteUser 
                email={user.email} 
                userId={user.userId} 
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </UsersTable>

      {data?.data && (
        <footer className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 md:flex-row">
          <span className="px-5 text-xs font-medium text-gray-300">
            Mostrando de {(data.data.page - 1) * PAGE_SIZE + 1} à{' '}
            {Math.min(data.data.page * PAGE_SIZE, data.data.totalCount)} de{' '}
            {data.data.totalCount} usuários
          </span>

          <div>
            <Pagination currentPage={page} totalPages={data.data.totalPages} />
          </div>
        </footer>
      )}
    </>
  )
}
