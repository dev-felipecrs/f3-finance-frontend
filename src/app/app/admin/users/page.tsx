import React from 'react'

import { Metadata } from 'next'

import { UsersList } from '@/presentation/components/pages/app/admin/users'

export const metadata: Metadata = {
  title: 'Usuários',
}

export default function UsersPage() {
  return <UsersList />
}
