import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function Button({ children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button
      className="bg-primary-500 hover:bg-primary-600 flex h-[3.75rem] w-full cursor-pointer items-center justify-center rounded-sm px-6 py-3 transition disabled:brightness-75"
      type={type}
      {...rest}
    >
      <span className="text-base font-bold text-white">{children}</span>
    </button>
  )
}
