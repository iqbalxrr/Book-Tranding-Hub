"use client"

import { useState } from "react"

export default function SettingsPage() {

  const [activeTab, setActiveTab] = useState("account")

  return (
    <div className="max-w-11/12 mx-auto p-6  mt-16 lg:mt-4">
      <h1 className="text-gray-600 text-2xl font-semibold mb-6">Settings</h1>

      {/* Tabs Header */}
      <div className="grid grid-cols-4 border-b">
        {["account", "appearance", "notifications", "security"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-center capitalize font-medium ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Account Tab */}
      {activeTab === "account" && (
        <div className="space-y-6 mt-6 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold">Account Settings</h2>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block font-medium">Email</label>
              <input
                type="email"
                defaultValue="admin@example.com"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block font-medium">Username</label>
              <input
                type="text"
                defaultValue="AdminUser"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Appearance Tab */}
      {activeTab === "appearance" && (
        <div className="space-y-6 mt-6 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold">Appearance</h2>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 border rounded-md hover:bg-gray-100">
              Light Mode
            </button>
            <button className="px-4 py-2 border rounded-md hover:bg-gray-100">
              Dark Mode
            </button>
            <button className="px-4 py-2 border rounded-md hover:bg-gray-100">
              System Default
            </button>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="space-y-6 mt-6 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <div className="flex items-center justify-between">
            <label htmlFor="emailNotif" className="font-medium">
              Email Notifications
            </label>
            <input type="checkbox" id="emailNotif" defaultChecked className="h-5 w-5" />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="pushNotif" className="font-medium">
              Push Notifications
            </label>
            <input type="checkbox" id="pushNotif" className="h-5 w-5" />
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="space-y-6 mt-6 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold">Security</h2>
          <div className="space-y-1.5">
            <label className="block font-medium">Change Password</label>
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none mt-2"
            />
            <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mt-3">
              Update Password
            </button>
          </div>
          <div className="flex items-center justify-between mt-4">
            <label htmlFor="2fa" className="font-medium">
              Enable Two-Factor Authentication
            </label>
            <input type="checkbox" id="2fa" className="h-5 w-5" />
          </div>
        </div>
      )}
    </div>
  )
}
