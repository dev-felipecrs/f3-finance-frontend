import React from 'react'

interface SelectLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const SelectLabel = React.forwardRef<HTMLLabelElement, SelectLabelProps>(
  ({ children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className="-tracking-(2px) text-sm font-medium text-gray-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        {...props}
      >
        {children}
      </label>
    )
  },
)
SelectLabel.displayName = 'SelectLabel'
