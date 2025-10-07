"use client";

import React from "react";
import { MdEdit } from "react-icons/md";

export default function ProfilePage() {
  return (
    <div className="max-w-6xl mx-auto p-6 mt-16 lg:mt-4">
      <h1 className="text-gray-600 text-2xl font-semibold mb-6">My Profile</h1>

      <div className="bg-white shadow rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section: Avatar + Basic Info */}
        <div className=" flex flex-col items-center md:items-start md:col-span-1 border-r pr-4">

     <div className="relative">

            <img
              src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
              alt="Profile"
              className=" w-28 h-28 rounded-full object-cover border mb-4"
            />
          
            <button 
            className="absolute bottom-5 right-1 p-1 bg-white rounded-full border hover:bg-gray-100 ">
              <MdEdit />
            </button>
     </div>

          <h2 className="text-xl font-semibold">Admin User</h2>
          <p className="text-gray-500">Dhaka, Bangladesh</p>
        </div>

        {/* Right Section: Other Info */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Username</h3>
            <p className="text-lg font-semibold text-gray-800">admin123</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Bio</h3>
            <p className="text-gray-700">Admin of BookTradeHub</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
              <p className="text-gray-700">+880123456789</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Website / Social Link</h3>
              <p className="text-blue-600 hover:underline cursor-pointer">
                https://mywebsite.com
              </p>
            </div>
          </div>

          <div className="pt-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Update Profile
            </button>
          </div>
        </div>

      </div>
    </div>

  );
}
