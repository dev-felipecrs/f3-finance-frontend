import React from 'react'

interface InputLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export const InputLabel = React.forwardRef<HTMLLabelElement, InputLabelProps>(
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
InputLabel.displayName = 'InputLabel'
