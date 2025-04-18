'use client'

import React from 'react'

import { Eye, EyeSlash } from '@phosphor-icons/react'

import { condicionalStyles } from '@/presentation/helpers'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ type, icon, iconPosition = 'right', ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const isPassword = type === 'password'

    function togglePassword() {
      setShowPassword((prev) => !prev)
    }

    return (
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute top-1/2 left-3 -translate-y-1/2">{icon}</div>
        )}

        <input
          type={isPassword && showPassword ? 'text' : type}
          className={condicionalStyles(
            'bg-background flex w-full rounded-sm border border-gray-200 px-5 py-4 text-sm text-gray-500 placeholder:text-gray-300 focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            {
              'pl-10': !!(icon && iconPosition === 'left'),
              'pr-10': (icon && iconPosition === 'right') || isPassword,
            },
          )}
          ref={ref}
          {...props}
        />

        {icon && iconPosition === 'right' && !isPassword && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2">
            {icon}
          </div>
        )}

        {isPassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
            tabIndex={-1}
          >
            {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    )
  },
)
InputField.displayName = 'InputField'
