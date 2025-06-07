import React from 'react'

interface SelectErrorMessageProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export const SelectErrorMessage = React.forwardRef<
  HTMLSpanElement,
  SelectErrorMessageProps
>(({ ...props }, ref) => {
  return (
    <span
      ref={ref}
      className="text-error-500 bottom absolute bottom-0 translate-y-full pt-1 text-xs font-medium"
      {...props}
    />
  )
})

SelectErrorMessage.displayName = 'SelectErrorMessage'
