'use client'
import React from 'react'

import ReactSelect, { Props } from 'react-select'
import { CaretDown } from '@phosphor-icons/react'

import { condicionalStyles } from '@/presentation/helpers'

interface SelectFieldProps extends Props {}

export function SelectField(props: SelectFieldProps) {
  return (
    <ReactSelect
      {...props}
      classNames={{
        control: (state) =>
          condicionalStyles(
            'bg-transparent! flex w-full rounded-sm border border-gray-200! px-5 py-4',
            {
              'ring-1! outline-none! shadow-none!': state.isFocused,
            },
          ),
        placeholder: () => 'text-sm! text-gray-300! m-0!',
        singleValue: () => 'text-sm! text-gray-500! m-0!',
        valueContainer: () => 'p-0! h-5!',
        input: () => 'p-0! m-0! h-5!',
        option: (state) =>
          condicionalStyles('', {
            'bg-transparent! text-gray-500!': state.isSelected,
            'bg-gray-100!': state.isFocused,
          }),
      }}
      components={{
        IndicatorsContainer: () => <CaretDown color="text-black" />,
      }}
    />
  )
}
