import React from 'react'

interface InputRootProps extends React.HTMLAttributes<HTMLDivElement> {}

export const InputRoot = React.forwardRef<HTMLDivElement, InputRootProps>(
  ({ ...props }, ref) => {
    return <div ref={ref} className="relative flex flex-col gap-4" {...props} />
  },
)
InputRoot.displayName = 'InputRoot'
