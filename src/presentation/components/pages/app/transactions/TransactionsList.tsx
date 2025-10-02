import React from 'react'

import { Pagination, Table } from '@/presentation/components/shared'
import { makeFindAllTransactionsUseCase } from '@/infra/factories/transactions'
import { DateFnsAdapter } from '@/infra/date'
import { TransactionType } from '@/domain/entities'

import { TransactionsTable } from './TransactionsTable'
import { DeleteTransaction } from './DeleteTransaction'

interface TransactionsListProps {
  page: number
}

const PAGE_SIZE = 50

export const TRANSACTION_TYPES_MAPPER: Record<TransactionType, string> = {
  expense: 'Despesa',
  income: 'Receita',
}

export async function TransactionsList({ page }: TransactionsListProps) {
  const findAllTransactionsUseCase = makeFindAllTransactionsUseCase()
  const data = await findAllTransactionsUseCase.execute({
    page,
    pageSize: PAGE_SIZE,
    filters: {},
  })
  const transactions = data.data?.pageResult ?? []

  const { format } = new DateFnsAdapter()

  return (
    <>
      <TransactionsTable>
        {transactions.map((transaction) => (
          <Table.Row key={transaction.transactionId}>
            <Table.Cell className="pl-2 md:w-64">
              {TRANSACTION_TYPES_MAPPER[transaction.transactionType]}
            </Table.Cell>
            <Table.Cell className="pl-2 md:w-64">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(transaction.amount)}
            </Table.Cell>
            <Table.Cell className="pl-2 md:w-64">
              {format(transaction.transactedAt, "dd 'de' MMMM 'de' yyyy")}
            </Table.Cell>
            <Table.Cell className="text-right">
              <DeleteTransaction 
                transactionType={transaction.transactionType} 
                transactionId={transaction.transactionId} 
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </TransactionsTable>

      {data?.data && (
        <footer className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 md:flex-row">
          <span className="px-5 text-xs font-medium text-gray-300">
            Mostrando de {(data.data.page - 1) * PAGE_SIZE + 1} a{' '}
            {Math.min(data.data.page * PAGE_SIZE, data.data.totalCount)} de{' '}
            {data.data.totalCount} transações
          </span>

          <div>
            <Pagination currentPage={page} totalPages={data.data.totalPages} />
          </div>
        </footer>
      )}
    </>
  )
}
