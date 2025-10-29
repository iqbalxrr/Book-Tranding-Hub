"use client";

import { useState, useEffect } from "react";
import {
  Loader2,
  User,
  Mail,
  Link,
  Phone,
  Info,
  Save,
  XCircle,
  CheckCircle,
  UserCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext"; 
import LoadingSpinner from "@/components/Loading/loadingSpinner";

const placeholderImage = "https://placehold.co/128x128/4f46e5/ffffff?text=User";

export default function ProfilePage() {
  const { user, loading } = useAuth(); // ✅ Using your real auth data
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    phone: "",
    role: "User",
    nickname: "",
    website: "",
    bio: "",
  });

  useEffect(() => {
    if (!user) return;

    setFormData({
      name: user.displayName || "",
      image: user.photoURL || placeholderImage,
      phone: user.phoneNumber || "",
      role: "User",
      nickname: "",
      website: "",
      bio: "A passionate learner and member of BookMate.",
    });
  }, [user]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save process (you can later connect this to Firestore)
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      setStatusMessage({
        type: "success",
        text: "Profile updated successfully!",
      });
      setTimeout(() => setStatusMessage(null), 4000);
    }, 1500);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-indigo-600 font-semibold text-lg">
       <LoadingSpinner />
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center h-96 text-red-600 font-semibold text-lg">
        <XCircle className="w-6 h-6 mr-2" /> Error: No user data found.
      </div>
    );

  // 🔹 Input field
  const InputField = ({
    icon: Icon,
    label,
    name,
    value,
    onChange,
    placeholder,
    readOnly = false,
  }) => (
    <div className="flex flex-col space-y-1">
      <label className="text-xs font-semibold text-gray-500 flex items-center">
        {Icon && <Icon className="w-4 h-4 mr-1 text-indigo-500" />} {label}
      </label>
      {readOnly || !isEditing ? (
        <div className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 bg-white min-h-[3rem] flex items-center text-sm shadow-inner transition duration-300">
          {value || <span className="text-gray-400">{placeholder}</span>}
        </div>
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-800 transition duration-200 shadow-sm text-sm"
        />
      )}
    </div>
  );

  // 🔹 Textarea field
  const TextareaField = ({ label, name, value, onChange, placeholder }) => (
    <div className="flex flex-col space-y-1 sm:col-span-2">
      <label className="text-xs font-semibold text-gray-500 flex items-center">
        <Info className="w-4 h-4 mr-1 text-indigo-500" /> {label}
      </label>
      {isEditing ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows="4"
          className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-800 transition duration-200 shadow-sm text-sm"
        />
      ) : (
        <div className="w-full border border-gray-200 rounded-xl p-4 text-gray-800 bg-white min-h-[8rem] whitespace-pre-wrap shadow-inner text-sm">
          {value || <span className="text-gray-400">{placeholder}</span>}
        </div>
      )}
    </div>
  );

  // 🔹 Status message
  const StatusMessage = ({ message }) => {
    if (!message) return null;
    const baseClasses =
      "p-3 rounded-xl font-medium text-sm transition duration-300 flex items-center space-x-3 shadow-md";
    const typeClasses =
      message.type === "success"
        ? "bg-green-50 text-green-700 border border-green-200"
        : "bg-blue-50 text-blue-700 border border-blue-200";

    const Icon = message.type === "success" ? CheckCircle : Info;

    return (
      <div className={`${baseClasses} ${typeClasses} mb-6`} role="alert">
        <Icon className="h-5 w-5 flex-shrink-0" />
        <span>{message.text}</span>
      </div>
    );
  };

  return (
    <div className="min-h-full flex justify-center py-6 sm:py-10 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="w-full  bg-white rounded-2xl shadow-2xl shadow-indigo-100 overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="p-6 md:p-10 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <UserCircle className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-extrabold text-gray-900">
              Profile Settings
            </h1>
          </div>
          <p className="text-gray-500 mt-1">
            Manage your public profile and contact info.
          </p>
        </div>

        {/* Content */}
        <div className="md:grid md:grid-cols-12 md:gap-10 p-6 md:p-10">
          {/* LEFT: Profile Picture */}
          <div className="md:col-span-4 lg:col-span-3 space-y-6 flex flex-col items-center md:items-start">
            <div className="relative mx-auto w-40 h-40 overflow-hidden rounded-full ring-4 ring-indigo-500/50 shadow-xl bg-gray-100">
            <img
  src={formData?.image || placeholderImage}
  alt="Profile"
  onError={(e) => (e.target.src = placeholderImage)}
  className="object-cover w-full h-full"
/>
            </div>

            <button
              disabled={!isEditing}
              onClick={() => {
                setStatusMessage({
                  type: "info",
                  text: "Image upload feature coming soon.",
                });
                setTimeout(() => setStatusMessage(null), 4000);
              }}
              className={`w-full max-w-xs md:max-w-none py-2.5 rounded-full font-semibold transition duration-200 text-sm shadow-md ${
                isEditing
                  ? "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200"
                  : "bg-gray-100 text-gray-500 cursor-not-allowed opacity-70"
              }`}
            >
              Change Photo
            </button>

            <div className="text-center md:text-left pt-2 border-t border-gray-100 w-full">
              <p className="text-xs text-gray-400 font-medium">Account Email</p>
              <p className="text-sm font-medium text-gray-700 break-all">
                {user.email}
              </p>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="md:col-span-8 lg:col-span-9 pt-8 md:pt-0 space-y-6">
            <StatusMessage message={statusMessage} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 border border-gray-100 rounded-xl shadow-inner bg-gray-50">
              <InputField
                icon={User}
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              <InputField
                icon={User}
                label="Nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="Preferred short name"
              />
              <InputField
                icon={Phone}
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+8801XXXXXXXXX"
              />
              <InputField
                icon={Link}
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourwebsite.com"
              />
              <InputField
                icon={Mail}
                label="Email"
                value={user.email}
                placeholder="N/A"
                readOnly
              />
              <InputField
                icon={User}
                label="Role"
                value={formData.role}
                readOnly
              />
              <TextareaField
                label="Biographical Info"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us a bit about yourself..."
              />
            </div>

            {/* Buttons */}
            <div className="pt-6 border-t border-gray-100 flex justify-end">
              {isEditing ? (
                <div className="space-x-4 flex">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2.5 rounded-full font-semibold text-gray-600 bg-white hover:bg-gray-100 transition duration-200 shadow-md border border-gray-200 hover:shadow-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`flex items-center px-6 py-2.5 rounded-full font-semibold transition duration-200 shadow-xl ${
                      isSaving
                        ? "bg-indigo-400 text-white cursor-not-allowed opacity-80"
                        : "bg-indigo-600 text-white hover:bg-indigo-700 transform hover:scale-[1.01]"
                    }`}
                  >
                    {isSaving ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : (
                      <Save className="w-5 h-5 mr-2" />
                    )}
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center bg-gray-800 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-gray-900 transition duration-200 shadow-xl transform hover:scale-[1.01]"
                >
                  <User className="w-5 h-5 mr-2" />
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
