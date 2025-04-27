import React from 'react'

import { twMerge } from 'tailwind-merge'

interface ButtonTextProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const ButtonText = React.forwardRef<HTMLSpanElement, ButtonTextProps>(
  ({ ...props }, ref) => {
    return (
      <span
        {...props}
        ref={ref}
        className={twMerge(
          'text-sm font-bold text-white lg:text-base',
          props.className,
        )}
      />
    )
  },
)

ButtonText.displayName = 'ButtonText'
