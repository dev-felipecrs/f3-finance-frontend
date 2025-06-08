'use client'
import React from 'react'

import { CloudArrowUp, FileXls } from '@phosphor-icons/react'

interface DropzoneFileProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
}

export function DropzoneFile({ id, value, ...props }: DropzoneFileProps) {
  const file = value as any

  return (
    <div className="flex w-full items-center justify-center">
      <label
        htmlFor={id}
        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {file && (
            <>
              <FileXls size={64} color="#05df72" />
              <p className="mt-4 mb-2 text-center text-sm text-gray-500">
                {file.name}
              </p>
            </>
          )}
          {!value && (
            <>
              <CloudArrowUp size={64} color="#bababa" />
              <p className="mt-4 mb-2 text-sm text-gray-500">
                <span className="font-semibold">Clique para enviar</span> ou
                arraste e solte
              </p>
              <p className="text-xs text-gray-500">XLS ou XLSX</p>
            </>
          )}
        </div>

        <input id={id} type="file" className="hidden" {...props} />
      </label>
    </div>
  )
}
