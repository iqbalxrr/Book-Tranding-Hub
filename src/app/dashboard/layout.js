import AdminSidebar from "@/components/adminSideber/AdminSideber";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import UserSidebar from "@/components/userSideber/UserSideber";
import Link from "next/link";
import { Toaster } from "react-hot-toast";


export const metadata = {
  title: "Dashboard",
  description: "Dashboard layout without Navbar/Footer",
};

export default function DashboardLayout({ children }) {

  const user = "user"

  return (
    <SidebarProvider>
      {user === "admin" ?
        <AdminSidebar />
        :
        <UserSidebar />
      }
      <main className="w-full h-screen">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
