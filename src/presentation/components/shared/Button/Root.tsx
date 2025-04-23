import React from 'react'

import { twMerge } from 'tailwind-merge'
import { CircleNotch } from '@phosphor-icons/react/dist/ssr'

interface ButtonRootProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonRootProps>(
  ({ isLoading = false, children, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        type={props.type || 'button'}
        className={twMerge(
          'bg-primary-500 hover:bg-primary-600 flex h-9 cursor-pointer items-center justify-center gap-1 rounded-sm px-5 py-2.5 transition disabled:brightness-75 md:h-[3.75rem] md:gap-2 md:px-6 md:py-3',
          props.className,
        )}
      >
        {isLoading && (
          <CircleNotch size={24} className="animate-spin text-white" />
        )}
        {!isLoading && children}
      </button>
    )
  },
)

ButtonRoot.displayName = 'ButtonRoot'
