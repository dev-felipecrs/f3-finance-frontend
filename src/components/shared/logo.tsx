import Image from 'next/image'
import React from 'react'
import logoImage from './public/F3Logo.svg'

interface LogoProps {
    size?: string
}

export default function Logo({size = "lg"}: LogoProps) {
  return (
    <div className='flex items-center'>
        <Image src={"./F3Logo.svg"} width={size=="lg" ? 50 : 40} height={size=="lg" ? 50 : 40} alt='F3 Logo'/>
        <span className={`ml-4 text-[#1729C3] font-bold tracking-tighter
            ${size=="lg" ? "text-[3rem]" : "text-[2rem]"}`}>
            Finance
        </span>
    </div>
  )
}
