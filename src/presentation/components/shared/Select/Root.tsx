import React from 'react'

interface SelectRootProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SelectRoot = React.forwardRef<HTMLDivElement, SelectRootProps>(
  ({ ...props }, ref) => {
    return <div ref={ref} className="relative flex flex-col gap-4" {...props} />
  },
)
SelectRoot.displayName = 'SelectRoot'
