import React from 'react'

import { Metadata } from 'next'

import { AddBankAccount } from '@/presentation/components/pages/app/admin/bank-accounts'

interface BankAccountsLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Contas Bancárias',
}

export default async function BankAccountsLayout({
  children,
}: BankAccountsLayoutProps) {
  return (
    <section className="bg-white p-5">
      <header className="flex items-center justify-between">
        <strong className="text-lg leading-[150%] font-semibold text-gray-500">
          Contas Bancárias
        </strong>

        <AddBankAccount />
      </header>

      {children}
    </section>
  )
}
