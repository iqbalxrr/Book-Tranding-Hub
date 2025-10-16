"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { Loader2, Mail, CalendarDays, User } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user's data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/me");
        if (!res.ok) throw new Error("Failed to load user data");
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("❌ Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Loader2 className="animate-spin text-teal-500 w-10 h-10" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-500">No user data found.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center border border-gray-100">
        {/* Profile Image */}
        <div className="flex justify-center">
          <Image
            src={
              userData.image ||
              user?.photoURL ||
              "https://i.ibb.co/F5nVJjR/default-avatar.png"
            }
            alt={userData.name}
            width={120}
            height={120}
            className="rounded-full border-4 border-teal-500 object-cover"
          />
        </div>

        {/* Name & Email */}
        <h2 className="mt-4 text-2xl font-semibold text-gray-800 flex justify-center items-center gap-2">
          <User className="w-5 h-5 text-teal-500" />
          {userData.name}
        </h2>
        <p className="text-gray-500 mt-2 flex justify-center items-center gap-2">
          <Mail className="w-4 h-4 text-teal-400" />
          {userData.email}
        </p>

        {/* Created Date */}
        <p className="mt-4 text-sm text-gray-400 flex justify-center items-center gap-2">
          <CalendarDays className="w-4 h-4 text-teal-400" />
          Joined on{" "}
          {new Date(userData.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200"></div>

        {/* Profile Stats (optional / demo) */}
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Books</p>
            <p className="font-semibold text-gray-800">12</p>
          </div>
          <div>
            <p className="text-gray-500">Requests</p>
            <p className="font-semibold text-gray-800">5</p>
          </div>
          <div>
            <p className="text-gray-500">Chats</p>
            <p className="font-semibold text-gray-800">8</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button className="mt-8 bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-medium transition-all">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
