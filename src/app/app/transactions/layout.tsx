import React from 'react'

import { Metadata } from 'next'

interface TransactionsLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Transações',
}

export default async function TransactionsLayout({
  children,
}: TransactionsLayoutProps) {
  return (
    <section className="bg-white p-5">
      <header className="flex items-center justify-between">
        <strong className="text-lg leading-[150%] font-semibold text-gray-500">
          Transações
        </strong>
      </header>

      {children}
    </section>
  )
}
