"use client";

import { useEffect, useState } from "react";

// Mock implementation of useAuth for runnable code environment
const useAuth = () => {
  // In a real application, replace this with your actual useAuth hook
  // Mock user for testing the UI
  return {
    user: {
      email: "jane.doe@example.com",
    },
  };
};

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
    // Adding placeholder fields for design completeness based on the image
    nickname: "Jane.r",
    website: "jane-doe.webflow.io",
    bio: "Jane is a dedicated software engineer specializing in modern React development and scalable cloud solutions. She is passionate about open-source projects and continuous learning.",
  });

  // Mock API interaction for a runnable example
  const mockFetchUser = async (email) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // Mock data response (to replace your actual fetch call)
    return {
      name: "Jane Doe",
      email: email,
      image: "https://placehold.co/128x128/4f46e5/ffffff?text=JD",
      phone: "+1 (555) 123-4567",
      role: "Administrator",
      nickname: "Jane.r",
      website: "jane-doe.webflow.io",
      bio: "Jane is a dedicated software engineer specializing in modern React development and scalable cloud solutions. She is passionate about open-source projects and continuous learning.",
    };
  };

  const mockSaveUser = async (email, data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Simulate successful update
    return { ...data, email };
  };

  // Fetch user data
  useEffect(() => {
    if (!user?.email) return;

    const fetchUser = async () => {
      try {
        // Mock fetch call
        const data = await mockFetchUser(user.email); 
        
        setUserData(data);
        setFormData({
          name: data.name || "",
          image: data.image || "https://placehold.co/128x128/4f46e5/ffffff?text=User",
          phone: data.phone || "",
          role: data.role || "user",
          nickname: data.nickname || "",
          website: data.website || "",
          bio: data.bio || "",
        });
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, [user]);

  // Handle form changes
  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Handle Save
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Mock save call
      const updated = await mockSaveUser(user.email, formData);
      setUserData(updated);
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
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-lg font-medium">Loading user data...</span>
        </div>
      </div>
    );

  // Input Field Component
  const InputField = ({ label, name, value, onChange, placeholder, readOnly = false }) => (
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
          readOnly={readOnly}
          className="w-full border-b border-gray-300 focus:border-indigo-500 outline-none text-gray-800 transition duration-150 py-2 px-1"
        />
      )}
    </div>
  );

  // Textarea Field Component
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

  // --- RENDERING PROFILE UI ---
  return (
    <div className="min-h-screen flex justify-center  px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="w-full   overflow-hidden p-8  ">
        
        <div className="md:grid md:grid-cols-12 md:gap-12">
            
            {/* Left Column: Account Management (Image and Actions) */}
            <div className="md:col-span-4 lg:col-span-3 space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">Account Management</h2>

                {/* Profile Picture Card */}
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl bg-gray-100 shadow-md">
                    <img
                        src={user?.photoURL}
                        alt="Profile"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/240x300/e5e7eb/4f46e5?text=Profile"; }}
                        className="w-full h-full object-cover transition duration-300"
                    />
                    {/* Placeholder for Remove Button if editing */}
                    {isEditing && (
                        <button 
                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg text-gray-600 hover:text-red-600 transition"
                            onClick={() => setFormData(prev => ({ ...prev, image: "" }))} // Mock removal
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    )}
                </div>

                {/* Upload Photo Button */}
                <button
                    onClick={() => { if(isEditing) alert("Simulated: Image upload dialog opened.")}}
                    disabled={!isEditing}
                    className={`w-full py-3 rounded-lg font-semibold transition duration-200 ${
                        isEditing ? "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200" : "bg-gray-100 text-gray-500 cursor-not-allowed"
                    }`}
                >
                    Upload Photo
                </button>

                {/* Password Fields (Always present, but only visible when not saving) */}
                <div className="pt-4 space-y-4 border-t border-gray-200">
                    <InputField label="Old Password" name="oldPassword" value="********" placeholder="********" readOnly={true} />
                    <InputField label="New Password" name="newPassword" value="********" placeholder="********" readOnly={true} />
                    <button
                        className={`w-full py-3 rounded-lg font-semibold transition duration-200 ${
                            isEditing ? "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200" : "bg-gray-100 text-gray-500 cursor-not-allowed"
                        }`}
                        onClick={() => alert("Simulated: Change password flow initiated.")}
                        disabled={!isEditing}
                    >
                        Change Password
                    </button>
                </div>
            </div>

            {/* Right Column: Profile Information (Form Fields) */}
            <div className="md:col-span-8 lg:col-span-9 pt-8 md:pt-0 space-y-8">
                <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">Profile Information</h2>

                {/* Identity Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <InputField label="Username" name="username" value={userData.email.split('@')[0] || "N/A"} placeholder="N/A" readOnly={true} />
                    <InputField label="First Name" name="name" value={formData.name.split(' ')[0] || ""} onChange={handleChange} placeholder="Jane" />
                    <InputField label="Nickname" name="nickname" value={formData.nickname} onChange={handleChange} placeholder="Jane.r" />
                    {/* Role is read-only in this mock, but could be an editable select in a real app */}
                    <InputField label="Role" name="role" value={userData.role} placeholder="Subscriber" readOnly={true} />
                    <InputField label="Last Name" name="nameLast" value={formData.name.split(' ').slice(1).join(' ') || ""} onChange={handleChange} placeholder="Doe" />
                    <InputField label="Display Name Publicly as" name="displayName" value={formData.name.split(' ')[0] || ""} onChange={() => {}} placeholder="Jane" />
                </div>

                {/* Contact Info */}
                <div className="pt-4 border-t border-gray-200 space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Contact Info</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <InputField label="Email (required)" name="email" value={userData.email} placeholder="N/A" readOnly={true} />
                        <InputField label="Phone (WhatsApp)" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 123-4567" />
                        <InputField label="Website" name="website" value={formData.website} onChange={handleChange} placeholder="jane-doe.webflow.io" />
                        <InputField label="Telegram" name="telegram" value="@jane-doe" onChange={() => {}} placeholder="@jane-doe" readOnly={true} />
                    </div>
                </div>

                {/* About the User */}
                <div className="pt-4 border-t border-gray-200 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">About the User</h3>
                    <TextareaField label="Biographical Info" name="bio" value={formData.bio} onChange={handleChange} placeholder="Tell us a little about yourself..." />
                </div>

                {/* Save/Edit Actions */}
                <div className="pt-6 border-t border-gray-200 flex justify-end">
                    {isEditing ? (
                        <div className="space-x-3">
                            <button
                                onClick={() => { setIsEditing(false); setFormData(userData); }}
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
                                {isSaving ? (
                                    <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM17 21v-8h-7"></path></svg>
                                )}
                                {isSaving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center bg-gray-800 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-900 transition duration-200 shadow-lg"
                        >
                            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
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
