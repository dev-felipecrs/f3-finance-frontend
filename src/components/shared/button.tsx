import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function Button({children, type='button', ...rest}: ButtonProps) {
  return (
    <button 
    className='bg-[#1729C3] w-[25rem] h-[2.50rem] rounded-[4px] font-bold'
    type={type}>
      {children}
    </button>
  )
}
