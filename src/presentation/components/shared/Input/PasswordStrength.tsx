import React from 'react'

import { condicionalStyles } from '@/presentation/helpers'

export interface InputPasswordStrengthProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  minLength?: number
}

export const InputPasswordStrength = React.forwardRef<
  HTMLDivElement,
  InputPasswordStrengthProps
>(({ value = '', minLength = 8, ...props }, ref) => {
  const strength = React.useMemo(() => {
    if (!value) return 0

    let score = 0

    function checkLength(value: string) {
      return value.length >= minLength
    }

    function checkUppercase(value: string) {
      return /[A-Z]/.test(value)
    }

    function checkLowercaseAndNumber(value: string) {
      return /[a-z]/.test(value) && /[0-9]/.test(value)
    }

    function checkSpecialChar(value: string) {
      return /[^A-Za-z0-9]/.test(value)
    }

    if (checkLength(value)) score += 1
    if (checkUppercase(value)) score += 1
    if (checkLowercaseAndNumber(value)) score += 1
    if (checkSpecialChar(value)) score += 1

    return score
  }, [value, minLength])

  function getStrengthText() {
    const strengthTexts: Record<number, string> = {
      0: 'Muito fraca',
      1: 'Fraca',
      2: 'Média',
      3: 'Boa',
      4: 'Forte',
    }

    return strengthTexts[strength]
  }

  return (
    <div ref={ref} className="flex items-center gap-5" {...props}>
      <div className="flex h-1 w-full gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={condicionalStyles(
              'h-full flex-1 rounded-full transition-colors',
              {
                'bg-gray-200': index >= strength,
                'bg-error-500': index < strength && strength === 1,
                'bg-warning-500': index < strength && strength === 2,
                'bg-warning-300': index < strength && strength === 3,
                'bg-success-600': index < strength && strength === 4,
              },
            )}
          />
        ))}
      </div>

      <p
        className={condicionalStyles('text-xs whitespace-nowrap', {
          'text-gray-400': strength < 1,
          'text-error-500': strength === 1,
          'text-warning-500': strength === 2,
          'text-warning-300': strength === 3,
          'text-success-600': strength === 4,
        })}
      >
        {getStrengthText()}
      </p>
    </div>
  )
})
InputPasswordStrength.displayName = 'InputPasswordStrength'
