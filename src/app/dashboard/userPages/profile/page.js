"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext"; // your firebase context

export default function ProfilePage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    phone: "",
    role: "",
    nickname: "",
    website: "",
    bio: "",
  });

  // Fetch user data from API
  useEffect(() => {
    if (!user?.email) return;

  const fetchUser = async () => {
  try {
    const res = await fetch(`/api/users/${user.email}`);
    if (!res.ok) throw new Error("Failed to fetch user data");
    const data = await res.json();

if (!data?.success || !data?.user) {
  console.warn("No user found for", user.email);
  return;
}

const u = data.user;

setUserData(u);
setFormData({
  name: u.name || "",
  image:
    u.image ||
    user?.photoURL ||
    "https://placehold.co/128x128/4f46e5/ffffff?text=User",
  phone: u.phone || "",
  role: u.role || "user",
  nickname: u.nickname || "",
  website: u.website || "",
  bio: u.bio || "",
});

  } catch (err) {
    console.error("Error fetching user:", err);
  }
};


    fetchUser();
  }, [user]);

  // Handle form changes
  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Save updated data to API
  const handleSave = async () => {
    if (!user?.email) return;
    setIsSaving(true);

    try {
      const res = await fetch(`/api/users/${encodeURIComponent(user.email)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update user");
      const { data } = await res.json();

      setUserData(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Loading
  if (!userData)
    return (
      <div className="flex justify-center items-center  p-4 bg-gray-50">
        <div className="flex items-center space-x-2 text-indigo-600">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="text-lg font-medium">Loading user data...</span>
        </div>
      </div>
    );

  // Input field
  const InputField = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    readOnly = false,
  }) => (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-500">{label}</label>
      {readOnly || !isEditing ? (
        <div className="w-full border-b border-gray-200 py-2 text-gray-800 bg-white">
          {value || placeholder}
        </div>
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border-b border-gray-300 focus:border-indigo-500 outline-none text-gray-800 transition duration-150 py-2 px-1"
        />
      )}
    </div>
  );

  const TextareaField = ({ label, name, value, onChange, placeholder }) => (
    <div className="flex flex-col space-y-1 md:col-span-2">
      <label className="text-sm font-medium text-gray-500">{label}</label>
      {isEditing ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows="4"
          className="w-full border border-gray-300 rounded-lg p-3 focus:border-indigo-500 outline-none text-gray-800 transition duration-150"
        />
      ) : (
        <div className="w-full border border-gray-200 rounded-lg p-3 text-gray-800 bg-gray-50 min-h-[6rem] whitespace-pre-wrap">
          {value || placeholder}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex justify-center px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="w-full overflow-hidden p-8">
        <div className="md:grid md:grid-cols-12 md:gap-12">
          {/* LEFT COLUMN */}
          <div className="md:col-span-4 lg:col-span-3 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
              Account Management
            </h2>

            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl bg-gray-100 shadow-md">
              <img
                src={formData.image}
                alt="Profile"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/240x300/e5e7eb/4f46e5?text=Profile";
                }}
                className="w-full h-full object-cover transition duration-300"
              />
              {isEditing && (
                <button
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg text-gray-600 hover:text-red-600 transition"
                  onClick={() => setFormData((p) => ({ ...p, image: "" }))}
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>

            <button
              onClick={() => isEditing && alert("Image upload simulated")}
              disabled={!isEditing}
              className={`w-full py-3 rounded-lg font-semibold transition duration-200 ${
                isEditing
                  ? "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200"
                  : "bg-gray-100 text-gray-500 cursor-not-allowed"
              }`}
            >
              Upload Photo
            </button>

            <div className="pt-4 space-y-4 border-t border-gray-200">
              <InputField
                label="Old Password"
                name="oldPassword"
                value="********"
                placeholder="********"
                readOnly={true}
              />
              <InputField
                label="New Password"
                name="newPassword"
                value="********"
                placeholder="********"
                readOnly={true}
              />
              <button
                disabled={!isEditing}
                onClick={() => alert("Change password simulated")}
                className={`w-full py-3 rounded-lg font-semibold transition duration-200 ${
                  isEditing
                    ? "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
                    : "bg-gray-100 text-gray-500 cursor-not-allowed"
                }`}
              >
                Change Password
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="md:col-span-8 lg:col-span-9 pt-8 md:pt-0 space-y-8">
            <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
              Profile Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField
                label="Username"
                name="username"
                value={userData.email.split("@")[0]}
                placeholder="N/A"
                readOnly={true}
              />
              <InputField
                label="First Name"
                name="name"
                value={formData.name.split(" ")[0] || ""}
                onChange={handleChange}
                placeholder="Jane"
              />
              <InputField
                label="Nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="Jane.r"
              />
              <InputField
                label="Role"
                name="role"
                value={formData.role}
                placeholder="Subscriber"
                readOnly={true}
              />
              <InputField
                label="Last Name"
                name="lastName"
                value={formData.name.split(" ").slice(1).join(" ")}
                onChange={handleChange}
                placeholder="Doe"
              />
              <InputField
                label="Display Name Publicly as"
                name="displayName"
                value={formData.name}
                placeholder="Jane Doe"
              />
            </div>

            <div className="pt-4 border-t border-gray-200 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Contact Info
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputField
                  label="Email (required)"
                  name="email"
                  value={userData.email}
                  placeholder="N/A"
                  readOnly={true}
                />
                <InputField
                  label="Phone (WhatsApp)"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
                <InputField
                  label="Website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="example.com"
                />
                <InputField
                  label="Telegram"
                  name="telegram"
                  value="@username"
                  placeholder="@username"
                  readOnly={true}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                About the User
              </h3>
              <TextareaField
                label="Biographical Info"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us a little about yourself..."
              />
            </div>

            <div className="pt-6 border-t border-gray-200 flex justify-end">
              {isEditing ? (
                <div className="space-x-3">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(userData);
                    }}
                    className="px-6 py-2.5 rounded-lg font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition duration-200 shadow-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`flex items-center px-6 py-2.5 rounded-lg font-semibold transition duration-200 shadow-md ${
                      isSaving
                        ? "bg-indigo-300 text-white cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg"
                    }`}
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center bg-gray-800 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-900 transition duration-200 shadow-lg"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
