'use client'
import React, { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { Trash } from '@phosphor-icons/react/dist/ssr'

import { Pagination, Skeleton, Table } from '@/presentation/components/shared'
import { makeFindAllTransactionsUseCase } from '@/infra/factories/transactions'
import { DateFnsAdapter } from '@/infra/date'
import { TransactionType } from '@/domain/entities'

const PAGE_SIZE = 50

const TRANSACTION_TYPES_MAPPER: Record<TransactionType, string> = {
  expense: 'Despesa',
  income: 'Receita',
}

export function TransactionsList() {
  const [page, setPage] = useState(1)

  const { format } = new DateFnsAdapter()

  const { data } = useQuery({
    queryKey: ['transactions', { page, pageSize: PAGE_SIZE }],
    queryFn: async () => {
      const findAllTransactionsUseCase = makeFindAllTransactionsUseCase()
      const transactions = await findAllTransactionsUseCase.execute({
        page,
        pageSize: PAGE_SIZE,
        filters: {},
      })

      return transactions
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
  })

  const onChangePage = (page: number) => {
    setPage(page)
  }

  return (
    <section className="bg-white p-5">
      <header className="flex items-center justify-between">
        <strong className="text-lg leading-[150%] font-semibold text-gray-500">
          Transações
        </strong>
      </header>

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
          <tbody>
            {!data?.data?.pageResult &&
              Array.from({ length: 5 }).map((_, index) => (
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

            {data?.data?.pageResult &&
              data?.data?.pageResult.map((transaction) => (
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
                    <button type="button" className="group cursor-pointer">
                      <Trash className="h-5 w-5 text-gray-400 transition-colors group-hover:text-gray-500 md:h-6 md:w-6" />
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
          </tbody>
        </Table.Root>
      </div>

      {data?.data && (
        <footer className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 md:flex-row">
          <span className="px-5 text-xs font-medium text-gray-300">
            Mostrando de {(data.data.page - 1) * PAGE_SIZE + 1} à{' '}
            {Math.min(data.data.page * PAGE_SIZE, data.data.totalCount)} de{' '}
            {data.data.totalCount} usuários
          </span>

          <div>
            <Pagination
              currentPage={page}
              totalPages={data.data.totalPages}
              onChangePage={onChangePage}
            />
          </div>
        </footer>
      )}
    </section>
  )
}
