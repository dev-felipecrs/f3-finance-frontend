'use client'
import React, { useEffect, useState } from 'react'

import { ArrowRight } from '@phosphor-icons/react'

import { condicionalStyles } from '@/presentation/helpers'
import { menuLinks } from '@/presentation/constants'

import { MenuSection } from './MenuSection'

type MobileSidebarProps = {
  isOpen: boolean
  onClose: () => void
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)

      const timeout = setTimeout(() => {
        setShouldAnimate(true)
      }, 20)

      return () => clearTimeout(timeout)
    }

    setShouldAnimate(false)

    const timeout = setTimeout(() => {
      setIsMounted(false)
    }, 300)

    return () => clearTimeout(timeout)
  }, [isOpen])

  if (!isMounted) return null

  return (
    <div
      className={condicionalStyles(
        'fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 lg:hidden',
        {
          'opacity-100': shouldAnimate,
          'opacity-0': !shouldAnimate,
        },
      )}
      onClick={onClose}
    >
      <aside
        className={condicionalStyles(
          'fixed top-0 left-0 h-full w-68 bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out',
          {
            'translate-x-0': shouldAnimate,
            '-translate-x-full': !shouldAnimate,
          },
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="mb-6 text-gray-600">
          <ArrowRight size={34} />
        </button>

        <div className="mt-6">
          {menuLinks.map((item) => (
            <MenuSection
              key={item.title}
              title={item.title}
              links={item.links}
              onNavigate={onClose}
            />
          ))}
        </div>
      </aside>
    </div>
  )
}
