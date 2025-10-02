"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="account" className="w-full">
        {/* Tabs Header */}
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account">
          <div className="space-y-6 mt-6 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold">Account Settings</h2>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input type="email" defaultValue="admin@example.com" />
              </div>
              <div className="space-y-1.5">
                <Label>Username</Label>
                <Input type="text" defaultValue="AdminUser" />
              </div>
              <Button className="mt-3">Save Changes</Button>
            </div>
          </div>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <div className="space-y-6 mt-6 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold">Appearance</h2>
            <div className="flex items-center gap-4">
              <Button variant="outline">Light Mode</Button>
              <Button variant="outline">Dark Mode</Button>
              <Button variant="outline">System Default</Button>
            </div>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <div className="space-y-6 mt-6 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold">Notifications</h2>
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotif">Email Notifications</Label>
              <Switch id="emailNotif" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="pushNotif">Push Notifications</Label>
              <Switch id="pushNotif" />
            </div>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="space-y-6 mt-6 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold">Security</h2>
            <div className="space-y-1.5">
              <Label>Change Password</Label>
              <Input type="password" placeholder="New Password" />
              <Input type="password" placeholder="Confirm Password" className="mt-2" />
              <Button className="mt-3 bg-red-500 hover:bg-red-700">Update Password</Button>
            </div>
            <div className="flex items-center justify-between mt-4">
              <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
              <Switch id="2fa" />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
