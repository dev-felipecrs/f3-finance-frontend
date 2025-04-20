import React from 'react'

import { twMerge } from 'tailwind-merge'

interface TableRootProps extends React.TableHTMLAttributes<HTMLTableElement> {}

export const TableRoot = React.forwardRef<HTMLTableElement, TableRootProps>(
  ({ ...props }, ref) => {
    return (
      <table
        {...props}
        ref={ref}
        className={twMerge('mt-6 w-full', props.className)}
      />
    )
  },
)

TableRoot.displayName = 'TableRoot'
