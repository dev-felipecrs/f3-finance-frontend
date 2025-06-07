import React, { Suspense } from 'react'

import crypto from 'node:crypto'

import { UsersList } from '@/presentation/components/pages/app/admin/users'

import UsersLoadingPage from './loading'

interface UsersPageProps {
  searchParams: Promise<{
    page: number
  }>
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const params = await searchParams
  const page = Number(params.page ?? 1)

  return (
    <Suspense fallback={<UsersLoadingPage />} key={crypto.randomUUID()}>
      <UsersList page={page} />
    </Suspense>
  )
}
