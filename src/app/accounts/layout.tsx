import React from 'react'

import Image from 'next/image'

import IllustrationRight from '../../../public/accounts/Illustration-right.png'
import IllustrationLeft from '../../../public/accounts/Illustration-left.png'

export default function AccountLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <div className="bg-primary-500 absolute top-0 left-0 -z-10 h-118 w-full">
        <Image
          src={IllustrationLeft}
          alt="Pequenas bolas ao canto inferior esquerdo"
          className="absolute bottom-10 left-10"
        />
        <Image
          src={IllustrationRight}
          alt="Pequenas bolas ao canto direito"
          className="absolute top-1/2 right-10 -translate-y-1/2"
        />
      </div>

      <main className="m-16 flex items-start justify-center">{children}</main>

      <footer className="mb-10 text-center text-sm text-gray-300">
        ©2025 F3 Solutions. All Rights Reserved.
      </footer>
    </div>
  )
}
