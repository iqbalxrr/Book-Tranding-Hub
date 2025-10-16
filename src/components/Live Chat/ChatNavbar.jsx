"use client"

import { ArrowLeft } from "lucide-react";
import { useRouter, } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";

const ChatNavbar = ({ recipientData }) => {

    const router = useRouter()
    const [bookInfo, setBookInfo] = useState('')

    useEffect(() => {
        const savedPath = localStorage.getItem(`chatWith_${recipientData?.email}`)
        if (savedPath) {
            setBookInfo(JSON.parse(savedPath))
        }
    }, [recipientData?.email])

    // console.log(bookInfo);

    const handleBack = () => {
        if (bookInfo) router.push(bookInfo?.path)
        else router.push('/books')
    }


    return (
        <div className="flex items-center justify-between bg-white px-4 py-2 border-b border-gray-300 rounded-md">
            {/* Left side */}
            <div className="hidden md:block">
                <div className="flex items-center gap-3">
                    {
                        recipientData?.image ?
                            <img
                                src={recipientData?.image}
                                alt={recipientData?.name || "user"}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            :
                            <FaCircleUser size={33} />
                    }

                    {/* user info */}
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-800 text-sm md:text-base">
                            {recipientData?.name || "Unknown recipientData"}
                        </span>
                        <span className="text-xs text-gray-500">
                            {recipientData?.lastSeen ? `last seen ${recipientData.lastSeen}` : "online"}
                        </span>
                    </div>
                </div>
            </div>

            {/* middle */}
            
            <div className="flex items-center gap-2">
                {bookInfo?.image ? <>
                <p className="text-gray-600">The last chat with {recipientData?.name} <br /> was about <span className="font-bold">{bookInfo?.name}</span></p>
                    <img
                        src={bookInfo?.image}
                        alt={bookInfo?.name}
                        className="w-8 h-11 object-cover rounded-md"
                    />
                </>
                : 
                <p className="text-gray-600">No conversation with {recipientData?.name} yet</p>
            }
            </div>

            {/* Right side icons */}
            <div className="flex items-center gap-4 text-gray-600">

                {bookInfo &&
                    <button
                        onClick={handleBack}
                        className="hover:text-gray-800"
                    >
                        <span className="block md:hidden rounded-full font-bold py-2 px-4 text-white bg-[#FF7B6B] hover:bg-[#FFEFEF] hover:text-[#FF7B6B] transition duration-500"
                        title="Back to details page"
                        >
                            <ArrowLeft size={22} />
                        </span>
                        {/* Text visible on medium screens and above */}
                        <span className="hidden md:block rounded-full font-bold py-2.5 px-6 text-white bg-[#FF7B6B] hover:bg-[#FFEFEF] hover:text-[#FF7B6B] transition duration-500">
                            Back to details page
                        </span>
                    </button>
                }

            </div>
        </div>
    );
};

export default ChatNavbar;
