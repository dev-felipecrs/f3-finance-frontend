import React from 'react'

import { Trash } from '@phosphor-icons/react/dist/ssr'

import { Pagination, Table } from '@/presentation/components/shared'
import { makeFindAllUsersUseCase } from '@/infra/factories/users'
import { DateFnsAdapter } from '@/infra/date'

import { UsersTable } from './UsersTable'
import { InviteUser } from './InviteUser'

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

  return (
    <section className="bg-white p-5">
      <header className="flex items-center justify-between">
        <strong className="text-lg leading-[150%] font-semibold text-gray-500">
          Usuários
        </strong>

        <InviteUser />
      </header>

      <UsersTable>
        {users.map((user) => (
          <Table.Row key={user.userId}>
            <Table.Cell className="pl-2 md:w-64">{user.email}</Table.Cell>
            <Table.Cell className="md:w-64">
              {format(user.createdAt, "dd 'de' MMMM 'de' yyyy")}
            </Table.Cell>
            <Table.Cell className="text-right">
              <button type="button" className="group cursor-pointer">
                <Trash className="h-5 w-5 text-gray-400 transition-colors group-hover:text-gray-500 md:h-6 md:w-6" />
              </button>
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
    </section>
  )
}
