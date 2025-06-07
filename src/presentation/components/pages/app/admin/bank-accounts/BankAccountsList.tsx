import React from 'react'

import { Trash } from '@phosphor-icons/react/dist/ssr'

import { Pagination, Table } from '@/presentation/components/shared'
import { makeFindAllBankAccountsUseCase } from '@/infra/factories/bank-accounts'
import { Bank } from '@/domain/entities'

import { BankAccountsTable } from './BankAccountsTable'

const PAGE_SIZE = 10

const BANK_ACCOUNTS_MAPPER: Record<Bank, string> = {
  bradesco: 'Bradesco',
  itau: 'Itaú',
  stone: 'Stone',
}

interface BankAccountsListProps {
  page: number
}

export async function BankAccountsList({ page }: BankAccountsListProps) {
  const findAllUsersUseCase = makeFindAllBankAccountsUseCase()
  const data = await findAllUsersUseCase.execute({
    page,
    pageSize: PAGE_SIZE,
  })
  const bankAccounts = data.data?.pageResult ?? []

  return (
    <>
      <BankAccountsTable>
        {bankAccounts.map((bankAccount) => (
          <Table.Row key={bankAccount.bankAccountId}>
            <Table.Cell className="pl-2 md:w-64">{bankAccount.name}</Table.Cell>
            <Table.Cell className="pl-2 md:w-64">
              {bankAccount.agencyNumber}
            </Table.Cell>
            <Table.Cell className="md:w-64">
              {bankAccount.accountNumber}
            </Table.Cell>
            <Table.Cell className="md:w-64">
              {BANK_ACCOUNTS_MAPPER[bankAccount.bank]}
            </Table.Cell>
            <Table.Cell className="text-right">
              <button type="button" className="group cursor-pointer">
                <Trash className="h-5 w-5 text-gray-400 transition-colors group-hover:text-gray-500 md:h-6 md:w-6" />
              </button>
            </Table.Cell>
          </Table.Row>
        ))}
      </BankAccountsTable>

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
