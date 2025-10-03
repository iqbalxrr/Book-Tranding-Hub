import AdminSidebar from "@/components/adminSideber/AdminSideber";
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


    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden fixed z-50">
          <div className="flex-none ">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
        </div>
        {/* Page content here */}
        <main className="w-full">
          {children}
        </main>
      </div>
        {/* sidebar */}
      <div className="drawer-side pt-8 lg:pt-0">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content h-screen w-3/5 lg:w-80 p-4">
          {user === "admin" ?
            <AdminSidebar />
            :
            <UserSidebar />
          }
        </ul>
      </div>
    </div>

    // <SidebarProvider>
    //   {user === "admin" ?
    //     <AdminSidebar />
    //     :
    //     <UserSidebar />
    //   }
    //   <main className="w-full h-screen">
    //     <SidebarTrigger />
    //     {children}
    //   </main>
    // </SidebarProvider>
  );
}
