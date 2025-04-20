import React from 'react'

import { twMerge } from 'tailwind-merge'

interface ButtonTextProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const ButtonText = React.forwardRef<HTMLSpanElement, ButtonTextProps>(
  ({ ...props }, ref) => {
    return (
      <span
        {...props}
        ref={ref}
        className={twMerge('text-base font-bold text-white', props.className)}
      />
    )
  },
)

ButtonText.displayName = 'ButtonText'
