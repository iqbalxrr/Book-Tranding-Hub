"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", image: "" });

  useEffect(() => {
    if (!user?.email) return;

    const fetchUser = async () => {
      try {
        const apiUrl = `/api/users/${encodeURIComponent(user.email)}`;
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUserData(data);
        setFormData({ name: data.name || "", image: data.image || "" });
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [user]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    const res = await fetch(`/api/users/${user.email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      const updated = await res.json();
      setUserData(updated);
      setIsEditing(false);
    }
  };

  if (!userData)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading user data...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">
            {userData.name}'s Profile
          </h1>
          <div className="mt-3 flex space-x-6 border-b text-sm">
            {[
              { id: "details", label: "Profile Details" },
              { id: "tasks", label: "Tasks Assigned" },
              { id: "permissions", label: "Project Permissions" },
              { id: "activity", label: "Activity Log" },
              { id: "login", label: "Login Record" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 border-b-2 ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-blue-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-5xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-sm">
        {activeTab === "details" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side */}
            <div className="flex flex-col items-center">
              <img
                src={
                  userData.image ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border border-gray-300 shadow-sm"
              />
              <div className="flex mt-4 space-x-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md text-sm"
                >
                  Edit Profile
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1 rounded-md text-sm">
                  Resend Activation Email
                </button>
              </div>
            </div>

            {/* Right Side */}
            {!isEditing ? (
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <strong>First name:</strong> {userData.name?.split(" ")[0] || "-"}
                </div>
                <div>
                  <strong>Last name:</strong> {userData.name?.split(" ")[1] || "-"}
                </div>
                <div>
                  <strong>Email:</strong> {userData.email}
                </div>
                <div>
                  <strong>Provider:</strong> {userData.provider}
                </div>
                <div>
                  <strong>Joined:</strong>{" "}
                  {new Date(userData.createdAt).toLocaleString()}
                </div>
                <div>
                  <strong>Timezone:</strong> GMT+0000 (UTC)
                </div>
                <div>
                  <strong>Country:</strong> Not set
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Profile Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "activity" && (
          <div className="text-gray-600 text-sm">No recent activity.</div>
        )}
        {activeTab === "tasks" && (
          <div className="text-gray-600 text-sm">No tasks assigned.</div>
        )}
        {activeTab === "permissions" && (
          <div className="text-gray-600 text-sm">
            No project permissions set.
          </div>
        )}
        {activeTab === "login" && (
          <div className="text-gray-600 text-sm">No login records found.</div>
        )}
      </div>
    </div>
  );
}
