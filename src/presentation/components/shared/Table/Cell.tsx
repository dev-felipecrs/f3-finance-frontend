import React from 'react'

import { twMerge } from 'tailwind-merge'

interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableDataCellElement> {}

export const TableCell = React.forwardRef<
  HTMLTableDataCellElement,
  TableCellProps
>(({ ...props }, ref) => {
  return (
    <td
      {...props}
      ref={ref}
      className={twMerge(
        'p-2 text-left text-xs font-medium text-gray-500 md:text-sm',
        props.className,
      )}
    />
  )
})

TableCell.displayName = 'TableCell'
