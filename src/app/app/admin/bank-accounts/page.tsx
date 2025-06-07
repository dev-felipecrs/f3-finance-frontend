import React from 'react'

import { Metadata } from 'next'

import { BankAccounts } from '@/presentation/components/pages/app/admin/bank-accounts'

export const metadata: Metadata = {
  title: 'Contas Bancárias',
}

export default function BankAccountsPage() {
  return <BankAccounts />
}
