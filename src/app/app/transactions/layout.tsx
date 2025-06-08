import React from 'react'

import { Metadata } from 'next'

import {
  RefreshList,
  UploadTransactionsFile,
} from '@/presentation/components/pages/app/transactions'
import { makeFindAllBankAccountsUseCase } from '@/infra/factories/bank-accounts'

interface TransactionsLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Transações',
}

export default async function TransactionsLayout({
  children,
}: TransactionsLayoutProps) {
  const findAllBankAccountsUseCase = makeFindAllBankAccountsUseCase()
  const data = await findAllBankAccountsUseCase.execute({
    page: 1,
    pageSize: 9999,
  })
  const bankAccounts = data.data?.pageResult ?? []

  if (!bankAccounts) throw new Error('Bank accounts not found')

  return (
    <section className="bg-white p-5">
      <header className="flex items-center justify-between">
        <strong className="text-lg leading-[150%] font-semibold text-gray-500">
          Transações
        </strong>

        <div className="flex items-center gap-4">
          <RefreshList />

          <UploadTransactionsFile bankAccounts={bankAccounts} />
        </div>
      </header>

      {children}
    </section>
  )
}
