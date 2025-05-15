import React from 'react'

import Image from 'next/image'

export default function AccountLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <div className="bg-primary-500 absolute top-0 left-0 -z-10 h-118 w-full">
        <div className="absolute bottom-10 left-10 hidden h-[9.5rem] w-[6.5rem] md:block">
          <Image
            src="/accounts/illustration-left.svg"
            alt="Pequenas círculos ao canto inferior esquerdo"
            fill
          />
        </div>

        <div className="absolute top-1/2 right-10 hidden h-[10rem] w-[2.75rem] -translate-y-1/2 md:block">
          <Image
            src="/accounts/illustration-right.svg"
            alt="Pequenas círculos ao canto direito"
            fill
          />
        </div>
      </div>

      <main className="my-auto flex items-start justify-center pt-15">
        <section className="relative max-w-[calc(100dvw_-_1.5rem_*2)] bg-white px-8 py-4 shadow-[0px_5px_15px_rgba(76,57,47,0.1)] md:max-w-[31rem] md:px-12 md:py-10">
          <div className="absolute -top-[3rem] -left-[3rem] -z-10 hidden h-[14rem] w-[6.25rem] md:block">
            <Image
              src="/accounts/rectangles.svg"
              alt="Dois retângulos no canto superior"
              fill
            />
          </div>

          <div>{children}</div>

          <div className="absolute -top-[2.75rem] -right-[2.75rem] -z-10 hidden h-[7.5rem] w-[7.5rem] md:block">
            <Image
              src="/accounts/pac-man.svg"
              alt="Círculo com uma fatia removida"
              fill
            />
          </div>
        </section>
      </main>

      <footer className="mt-36 mb-10 text-center text-sm text-gray-300">
        ©2025 F3 Solutions. All Rights Reserved.
      </footer>
    </div>
  )
}
