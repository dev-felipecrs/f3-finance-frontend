import React from 'react'

import Image from 'next/image'

export default function AccountLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <div className="bg-primary-500 absolute top-0 left-0 -z-10 h-118 w-full">
        <div className="absolute bottom-10 left-10 h-[9.5rem] w-[6.5rem]">
          <Image
            src="/accounts/illustration-left.svg"
            alt="Pequenas círculos ao canto inferior esquerdo"
            fill
          />
        </div>

        <div className="absolute top-1/2 right-10 h-[10rem] w-[2.75rem] -translate-y-1/2">
          <Image
            src="/accounts/illustration-right.svg"
            alt="Pequenas círculos ao canto direito"
            fill
          />
        </div>
      </div>

      <main className="m-16 flex items-start justify-center">
        <section className="relative bg-white px-[3rem] py-[2.5rem]">
          <div className="absolute -top-[3rem] -left-[3rem] -z-10 h-[14rem] w-[6.25rem]">
            <Image
              src="/accounts/rectangles.svg"
              alt="Dois retângulos no canto superior"
              fill
            />
          </div>

          {children}

          <div className="absolute -top-[2.75rem] -right-[2.75rem] -z-10 h-[7.5rem] w-[7.5rem]">
            <Image
              src="/accounts/pac-man.svg"
              alt="Círculo com uma fatia removida"
              fill
            />
          </div>
        </section>
      </main>

      <footer className="mb-10 text-center text-sm text-gray-300">
        ©2025 F3 Solutions. All Rights Reserved.
      </footer>
    </div>
  )
}
