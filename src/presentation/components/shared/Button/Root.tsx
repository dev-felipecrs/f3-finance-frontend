import React from 'react'

import { twMerge } from 'tailwind-merge'

interface ButtonRootProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonRootProps>(
  ({ ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        type={props.type || 'button'}
        className={twMerge(
          'bg-primary-500 hover:bg-primary-600 flex h-[3.75rem] cursor-pointer items-center justify-center gap-2 rounded-sm px-6 py-3 transition disabled:brightness-75',
          props.className,
        )}
      />
    )
  },
)

ButtonRoot.displayName = 'ButtonRoot'
