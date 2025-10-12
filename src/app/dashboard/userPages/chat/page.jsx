'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'

export default  function page() {


  const {user} = useAuth()
  const router = useRouter()

  const [users, setUsers] = useState()

 useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  fetchUsers();
}, []);
//  console.log(users);

const goToPrivateChat =(email)=>{
   router.push(`/dashboard/userPages/chat/${email}`)
}

  return (
    <div className="flex h-screen">
      {/* Left: users list */}
      <div className="w-1/4 border-r p-2 overflow-y-auto">
        <h2 className="text-xl font-bold mb-3">All Users</h2>
        {users?.map((U) => (
          <div
            key={U?.email}
            onClick={()=> goToPrivateChat(U?.email)}
            className={`p-2 rounded-md mb-1 cursor-pointer hover:bg-gray-200 `}
          >
            {
              user?.email === U?.email ? <p className="font-medium text-orange-300">My-Self</p>
              :
            <p className="font-medium">{U?.name || U?.email}</p>
            }
          </div>
        ))}
      </div>

      {/* Right: chat box */}
      <div className="w-3/4 flex items-center justify-center">

      <p className="text-gray-500 md:text-3xl lg:text-4xl">Select a user to start chatting</p>
      
      </div>
    </div>
  )
}
