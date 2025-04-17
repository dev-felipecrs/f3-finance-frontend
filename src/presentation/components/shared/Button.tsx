import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function Button({
  children,
  type='button',
  ...rest
}: ButtonProps) {
  return (
    <button
      className='w-full flex items-center justify-center bg-primary-500 h-[3.75rem] px-6 py-3 rounded-sm cursor-pointer hover:bg-primary-600 disabled:brightness-75 transition'
      type={type}
      {...rest}
    >
      <span className='text-white text-base font-bold'>
        {children}
      </span>
    </button>
  )
}
