'use client'
import React from 'react'

import Link from 'next/link'

import { condicionalStyles } from '@/presentation/helpers'

import { PaginationControl } from './Control'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  return (
    <div className="flex items-center gap-4">
      <PaginationControl
        disabled={currentPage === 1}
        href={{ query: { page: currentPage - 1 } }}
      >
        Anterior
      </PaginationControl>

      <div className="flex items-center gap-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <Link
            key={index}
            href={{ query: { page: index + 1 } }}
            className={condicionalStyles(
              'text-sx flex h-10 w-11 cursor-pointer items-center justify-center gap-1 rounded-sm border border-gray-200 bg-white font-medium text-gray-500 transition hover:bg-white hover:brightness-95 disabled:brightness-75',
              {
                'border-primary-500! bg-primary-500! hover:bg-primary-600! text-white! hover:brightness-100!':
                  currentPage === index + 1,
              },
            )}
          >
            {index + 1}
          </Link>
        ))}
      </div>

      <PaginationControl
        disabled={currentPage === totalPages}
        href={{ query: { page: currentPage + 1 } }}
      >
        Próximo
      </PaginationControl>
    </div>
  )
}
