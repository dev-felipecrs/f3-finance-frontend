import React from 'react'

import { twMerge } from 'tailwind-merge'

interface PaginationControlProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const PaginationControl = React.forwardRef<
  HTMLButtonElement,
  PaginationControlProps
>(({ ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      type="button"
      className={twMerge(
        'cursor-pointer bg-transparent px-5 text-xs font-medium text-gray-300 hover:brightness-95 disabled:cursor-not-allowed disabled:brightness-75',
        props.className,
      )}
    />
  )
})

PaginationControl.displayName = 'PaginationControl'
