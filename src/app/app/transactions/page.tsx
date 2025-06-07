import React, { Suspense } from 'react'

import crypto from 'node:crypto'

import { TransactionsList } from '@/presentation/components/pages/app/transactions'

import TransactionsLoadingPage from './loading'

interface TransactionsPageProps {
  searchParams: Promise<{
    page: number
  }>
}

export default async function TransactionsPage({
  searchParams,
}: TransactionsPageProps) {
  const params = await searchParams
  const page = Number(params.page ?? 1)

  return (
    <Suspense fallback={<TransactionsLoadingPage />} key={crypto.randomUUID()}>
      <TransactionsList page={page} />
    </Suspense>
  )
}
