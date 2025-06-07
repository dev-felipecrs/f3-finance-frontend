import React, { Suspense } from 'react'

import crypto from 'node:crypto'

import { BankAccountsList } from '@/presentation/components/pages/app/admin/bank-accounts'

import BankAccountsLoadingPage from './loading'

interface BankAccountsPageProps {
  searchParams: Promise<{
    page: number
  }>
}

export default async function BankAccountsPage({
  searchParams,
}: BankAccountsPageProps) {
  const params = await searchParams
  const page = Number(params.page ?? 1)

  return (
    <Suspense fallback={<BankAccountsLoadingPage />} key={crypto.randomUUID()}>
      <BankAccountsList page={page} />
    </Suspense>
  )
}
