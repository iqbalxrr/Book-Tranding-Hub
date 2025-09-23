"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Buttons() {

    const pathname = usePathname()

    const links = [
        { href: '/', label: 'Home' },
        { href: '/detailes', label: 'Detailes' }
    ]

    return (
            <div className='flex gap-6 justify-center'>
                {links.map((link) => {

                    const isActive = pathname === link.href

                    return (
                        <Link
                            key={link.label}
                            href={link.href}
                            className={`${isActive ? "text-[#FF7B6B] underline" : "text-gray-600"
                                }`}
                        >
                            {link.label}
                        </Link>
                    )
                })}
            </div>
    )
}
