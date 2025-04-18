import React from 'react'

interface InputDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const InputDescription = React.forwardRef<
  HTMLParagraphElement,
  InputDescriptionProps
>(({ ...props }, ref) => {
  return <p ref={ref} className="text-xs text-gray-400" {...props} />
})
InputDescription.displayName = 'InputDescription'
