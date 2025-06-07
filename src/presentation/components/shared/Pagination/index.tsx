'use client'
import React from 'react'

import Link from 'next/link'

import { condicionalStyles } from '@/presentation/helpers'

import { PaginationControl } from './Control'

import { Button } from '../Button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onChangePage(page: number): void
}

export function Pagination({
  currentPage,
  totalPages,
  onChangePage,
}: PaginationProps) {
  return (
    <div className="flex items-center gap-4">
      <PaginationControl
        disabled={currentPage === 1}
        onClick={() => onChangePage(currentPage - 1)}
      >
        Anterior
      </PaginationControl>

      <div className="flex items-center gap-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button.Root
            key={index}
            onClick={() => onChangePage(index + 1)}
            className={condicionalStyles(
              'h-9 w-10 border border-gray-200 bg-white hover:bg-white hover:brightness-95',
              {
                'border-primary-500 bg-primary-500 hover:bg-primary-600 hover:brightness-100':
                  currentPage === index + 1,
              },
            )}
          >
            <Button.Text
              className={condicionalStyles(
                'text-sx font-medium text-gray-500',
                {
                  'text-white': currentPage === index + 1,
                },
              )}
            >
              {index + 1}
            </Button.Text>
          </Button.Root>
        ))}
      </div>

      <PaginationControl
        disabled={currentPage === totalPages}
        onClick={() => onChangePage(currentPage + 1)}
      >
        Próximo
      </PaginationControl>
    </div>
  )
}

interface PaginationLinkProps {
  currentPage: number
  totalPages: number
}

export function PaginationLink({
  currentPage,
  totalPages,
}: PaginationLinkProps) {
  return (
    <div className="flex items-center gap-4">
      <Link href={{ query: { page: currentPage - 1 } }}>
        <PaginationControl
        // disabled={currentPage === 1}
        // onClick={() => onChangePage(currentPage - 1)}
        >
          Anterior
        </PaginationControl>
      </Link>

      <div className="flex items-center gap-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button.Root
            key={index}
            // onClick={() => onChangePage(index + 1)}
            className={condicionalStyles(
              'h-9 w-10 border border-gray-200 bg-white hover:bg-white hover:brightness-95',
              {
                'border-primary-500 bg-primary-500 hover:bg-primary-600 hover:brightness-100':
                  currentPage === index + 1,
              },
            )}
          >
            <Button.Text
              className={condicionalStyles(
                'text-sx font-medium text-gray-500',
                {
                  'text-white': currentPage === index + 1,
                },
              )}
            >
              {index + 1}
            </Button.Text>
          </Button.Root>
        ))}
      </div>

      <Link href={{ query: { page: currentPage + 1 } }}>
        <PaginationControl
        // disabled={currentPage === totalPages}
        // onClick={() => onChangePage(currentPage + 1)}
        >
          Próximo
        </PaginationControl>
      </Link>
    </div>
  )
}
