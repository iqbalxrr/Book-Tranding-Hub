'use client'

import { useRouter } from 'next/navigation';
import React from 'react'
import { FaRegEye } from 'react-icons/fa';
import { RiPokerHeartsLine } from 'react-icons/ri';
import { TbArrowsCross } from 'react-icons/tb';



export default  function HoverButtons({book}) {

   
    const router = useRouter()

    const addToWishlist =()=>{
        console.log('hello from addToWishlist');
    }

    const compareBook =()=>{
        console.log('hello from compareBook');
    }

   const seeDetails =()=>{
    //  console.log('hello from seeDetails', book?._id);
     router.push(`/allBooks/${book?._id}`)
   }

   const actions = [
     {icon: <RiPokerHeartsLine />, onclick: addToWishlist , hoverMsg: "add To Wishlist"},
     {icon: <TbArrowsCross />, onclick: compareBook , hoverMsg: "Compare Book"},
     {icon: <FaRegEye />, onclick: seeDetails , hoverMsg: "See Details"}
   ]

    return (
        <div>
            {/* Hover actions */}
            <div className="absolute top-24 right-3 flex flex-col gap-3 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {actions.map(
                    (action, i) => (
                        <button
                            key={i}
                            className="w-9 h-9 flex justify-center items-center hover:text-white transition duration-700 p-2 rounded-full border border-gray-400 hover:bg-[#FF7B6B]"
                            onClick={action.onclick}
                            title={action.hoverMsg}
                        >
                            {action.icon}
                        </button>
                    )
                )}
            </div>
        </div>
    )
}
