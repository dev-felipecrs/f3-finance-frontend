import React from 'react'

import { twMerge } from 'tailwind-merge'

interface TableRowProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  > {}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ ...props }, ref) => {
    return (
      <tr
        {...props}
        ref={ref}
        className={twMerge(
          'h-16 border-t border-gray-200 pt-6',
          props.className,
        )}
      />
    )
  },
)

TableRow.displayName = 'TableRow'
