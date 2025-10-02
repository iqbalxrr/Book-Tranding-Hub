"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {/* Avatar Section */}
      <div className="flex items-center gap-6">
        <Avatar className="w-20 h-20">
          <AvatarImage src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        <Button variant="outline">Change Photo</Button>
      </div>

      {/* Profile Form */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <div className="space-y-1.5">
          <Label>Full Name</Label>
          <Input type="text" defaultValue="Admin User" />
        </div>
        <div className="space-y-1.5">
          <Label>Username</Label>
          <Input type="text" defaultValue="admin123" />
        </div>
        <div className="space-y-1.5">
          <Label>Bio</Label>
          <Textarea placeholder="Write something about yourself..." defaultValue="Admin of BookTradeHub" />
        </div>
        <div className="space-y-1.5">
          <Label>Phone Number</Label>
          <Input type="text" placeholder="+880123456789" />
        </div>
        <div className="space-y-1.5">
          <Label>Location</Label>
          <Input type="text" placeholder="Dhaka, Bangladesh" />
        </div>
        <div className="space-y-1.5">
          <Label>Website / Social Link</Label>
          <Input type="url" placeholder="https://mywebsite.com" />
        </div>
        <Button className="mt-4">Save Changes</Button>
      </div>
    </div>
  )
}
