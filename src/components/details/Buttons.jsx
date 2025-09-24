"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Buttons() {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Home' },
     { href: '/allBooks', label: 'All Books' },
    { href: '/allBooks/', label: 'Detailes' }
  ]

  return (
    <div className='flex gap-6 justify-center'>
      {links.map((link) => {
         let isActive = false

        if (link.href === '/allBooks') {
          // ✅ Active only on exact "/allBooks"
          isActive = pathname === '/allBooks'
        } else if (link.href === '/allBooks/') {
          // ✅ Active on "/allBooks/[id]" but not on "/allBooks"
          isActive = pathname.startsWith('/allBooks/') && pathname !== '/allBooks'
        }

        return (
          <Link
            key={link.label}
            href={link.href}
            className={`${
              isActive
                ? "text-[#FF7B6B] underline"
                : "text-gray-600"
            }`}
          >
            {link.label}
          </Link>
        )
      })}
    </div>
  )
}

