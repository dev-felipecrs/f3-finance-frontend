import React from 'react'

import Image from 'next/image'

import { condicionalStyles } from '@/presentation/helpers'

type LogoSize = 'lg' | 'md'

interface LogoProps {
  size?: LogoSize
}

export function Logo({ size = 'lg' }: LogoProps) {
  const imageSize: Record<LogoSize, number> = {
    lg: 50,
    md: 40,
  }

  return (
    <div className="flex items-center">
      <Image
        src="/shared/logo.svg"
        width={imageSize[size]}
        height={imageSize[size]}
        alt="F3 Logo"
      />

      <span
        className={condicionalStyles(
          'text-primary-500 ml-4 font-bold tracking-tighter',
          {
            'text-[3rem]': size === 'lg',
            'text-[2rem]': size === 'md',
          },
        )}
      >
        Finance
      </span>
    </div>
  )
}
