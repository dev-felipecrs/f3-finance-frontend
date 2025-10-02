import React from 'react'

import { Metadata } from 'next'

import { DashboardCharts } from '@/presentation/components/pages/app/admin/dashboard'
import { makeFindAllTransactionsUseCase } from '@/infra/factories/transactions'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function Page() {
  const findAllTransactions = makeFindAllTransactionsUseCase()
  const result = await findAllTransactions.execute({
    page: 1,
    pageSize: 500,
    filters: {},
  })
  const transactions = (result.data?.pageResult ?? []).map((t) => ({
    amount: t.amount,
    transactionType: t.transactionType,
    transactedAt: new Date(t.transactedAt).toISOString(),
  }))

  return (
    <div className="bg-light-mode h-full w-full">
      <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
      <section className="mt-6">
        <DashboardCharts initialTransactions={transactions} />
      </section>
    </div>
  )
}
