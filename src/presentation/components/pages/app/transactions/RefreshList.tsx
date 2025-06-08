'use client'
import React from 'react'

import { usePathname } from 'next/navigation'
import { ArrowsClockwise } from '@phosphor-icons/react'

import { revalidatePage } from '@/presentation/actions'

export function RefreshList() {
  const pathname = usePathname()

  const onRefresh = async () => {
    await revalidatePage(pathname)
  }

  return (
    <button type="button" onClick={onRefresh} className="cursor-pointer">
      <ArrowsClockwise size={32} color="#bababa" />
    </button>
  )
}
