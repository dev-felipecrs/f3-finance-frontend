import React from 'react'

import { Metadata } from 'next'

import { DashboardCharts } from '@/presentation/components/pages/app/admin/dashboard'
import { makeFindAllTransactionsUseCase } from '@/infra/factories/transactions'
import { makeFindAllBankAccountsUseCase } from '@/infra/factories/bank-accounts'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function Page() {
  const findAllTransactions = makeFindAllTransactionsUseCase()
  const findAllBankAccounts = makeFindAllBankAccountsUseCase()

  const [transactionsResult, bankAccountsResult] = await Promise.all([
    findAllTransactions.execute({
      page: 1,
      pageSize: 1000, // Aumentado para buscar mais transações
      filters: {},
    }),
    findAllBankAccounts.execute({
      page: 1,
      pageSize: 100,
    }),
  ])

  const transactions = (transactionsResult.data?.pageResult ?? []).map((t) => ({
    amount: t.amount,
    transactionType: t.transactionType,
    transactedAt: new Date(t.transactedAt).toISOString(),
    bankAccountId: t.bankAccountId,
  }))

  const bankAccounts = bankAccountsResult.data?.pageResult ?? []
  const totalTransactionsCount = transactionsResult.data?.totalCount ?? 0

  return (
    <div className="bg-light-mode h-full w-full">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>
      <section>
        <DashboardCharts
          initialTransactions={transactions}
          initialBankAccounts={bankAccounts}
          initialTotalCount={totalTransactionsCount}
        />
      </section>
    </div>
  )
}
