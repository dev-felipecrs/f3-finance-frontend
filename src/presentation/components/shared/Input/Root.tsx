import React from 'react'

export interface InputRootProps extends React.HTMLAttributes<HTMLDivElement> {}

export const InputRoot = React.forwardRef<HTMLDivElement, InputRootProps>(
  ({ ...props }, ref) => {
    return <div ref={ref} className="flex flex-col gap-4" {...props} />
  },
)
InputRoot.displayName = 'InputRoot'
