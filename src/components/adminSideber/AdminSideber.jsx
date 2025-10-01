"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem
} from "../ui/sidebar";
import { Calendar, Home, Inbox, Search, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils";


const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Settings",
    url: "/dashboard/adminPages/settings",
    icon: Settings,
  },
  {
    title: "Profile",
    url: "/dashboard/adminPages/profile",
    icon: User,
  },

]

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-bold">Book Mate</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {

                const isActive = 
                pathname === item?.url ||
                (item?.url !== '/' && pathname.startsWith('dashboard'))

                return(<SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>

                    <Link 
                    href={item.url}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive
                            ? "bg-blue-100 text-blue-600 font-semibold"
                            : "text-gray-700 hover:bg-gray-100"
                    )}
                    >
                      <item.icon className="w-4 h-4"/>
                      <span>{item.title}</span>
                    </Link>

                  </SidebarMenuButton>
                </SidebarMenuItem>)
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
