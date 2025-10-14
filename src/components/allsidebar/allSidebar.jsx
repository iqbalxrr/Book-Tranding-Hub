"use client"

import { useAuth } from '@/context/AuthContext'
import React from 'react'
import AdminSidebar from '../adminSideber/AdminSideber'
import UserSidebar from '../userSideber/UserSideber'

export default function Sidebars() {

    const {user} = useAuth()


  return (
    <div className='fixed  '>
        {user?.email === "admin@gmail.com" ?
            <AdminSidebar />
            :
            <UserSidebar />
          }
    </div>
  )
}
