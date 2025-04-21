import React from 'react'

interface InputErrorMessageProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export const InputErrorMessage = React.forwardRef<
  HTMLSpanElement,
  InputErrorMessageProps
>(({ ...props }, ref) => {
  return (
    <span
      ref={ref}
      className="text-error-500 bottom absolute bottom-0 translate-y-full pt-1 text-xs font-medium"
      {...props}
    />
  )
})

InputErrorMessage.displayName = 'InputErrorMessage'
