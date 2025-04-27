import React from 'react'

import { twMerge } from 'tailwind-merge'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={twMerge(
          'animate-pulse rounded bg-gray-300',
          props.className,
        )}
      />
    )
  },
)

Skeleton.displayName = 'Skeleton'
