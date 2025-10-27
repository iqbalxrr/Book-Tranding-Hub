"use client"

import { useAuth } from '@/context/AuthContext';
import { addNotification } from '@/lib/addNotification';
import React from 'react'

export default function SendNo({bookOwner}) {

    const {user} = useAuth()

    const handleNoti =async()=>{
          // notification function
                await addNotification(bookOwner, {
                  type: "trade_request",
                  text: `${user?.displayNmae || user?.email} wants to exchange a book with you.`,
                //   url: `/trades/${tradeId}`,
                });

                console.log("object send noti");
    }

  return (
    <div className=''>
        <button
        onClick={handleNoti}
        className='btn btn-active'
        >
            send Noti
        </button>
    </div>
  )
}
