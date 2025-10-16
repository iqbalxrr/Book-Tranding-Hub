"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

export default function TanStackQueryProvider({children}) {

    const queryQlient = new QueryClient()
  return (
    <QueryClientProvider client={queryQlient}>
        {children}
    </QueryClientProvider>
  )
}
