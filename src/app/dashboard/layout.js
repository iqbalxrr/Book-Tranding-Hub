import AdminSideber from "@/components/adminSideber/AdminSideber";
import useUserRole from "@/hooks/useUserRole";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dashboard",
  description: "Dashboard layout without Navbar/Footer",
};

export default function DashboardLayout({ children }) {


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
        {children}
      </div>

      <div className="drawer-side pt-8 lg:pt-0">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-3/5 lg:w-80 p-4">
          {/* Sidebar content here */}
          
          <div className='col-span-3 mt-8'>
            <Link href="/">Home</Link>

            <AdminSideber />
          </div>
        </ul>
      </div>
    </div>
  );
}
