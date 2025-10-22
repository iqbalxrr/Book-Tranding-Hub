"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { toast, Toaster } from "react-hot-toast";
import { auth, googleProvider } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, User, Loader2, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { loginWithGoogle } = useAuth();

  // 🔹 Email & Password Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Firebase registration
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Add display name
      await updateProfile(user, { displayName: name });

      // Save user in MongoDB
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "MongoDB save failed");
      }

      toast.success("✅ Registration successful!");
      router.push("/login");
    } catch (err) {
      console.error(err);
      await Swal.fire({
        title: "Error!",
        text: err.message || "Registration failed. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Google Sign-In
  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          password: "google-auth",
        }),
      });

      await Swal.fire({
        title: "Welcome!",
        text: `${user.displayName || "User"}, you’ve signed in successfully with Google 🎉`,
        icon: "success",
        confirmButtonColor: "#4f46e5",
        confirmButtonText: "Continue",
      });

      router.push("/");
    } catch (err) {
      console.error(err);
      await Swal.fire({
        title: "Error!",
        text: err.message || "Google sign-in failed. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Styled Input Component
  const AuthInput = ({ type, placeholder, value, onChange, Icon }) => (
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-800 transition duration-200 shadow-sm placeholder-gray-500 text-base"
        required
      />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center   py-12 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <Toaster position="top-right" />
      <div className="w-full max-w-md  p-10  ransition-all duration-300 hover:shadow-3xl">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Create Account ✨
          </h2>
          <p className="mt-2 text-lg text-indigo-600 font-medium">
            Join us and start your journey
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          <AuthInput
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            Icon={User}
          />
          <AuthInput
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            Icon={Mail}
          />
          <AuthInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            Icon={Lock}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl font-bold text-lg transition duration-300 shadow-xl transform hover:scale-[1.01] ${
              loading
                ? "bg-indigo-400 text-white cursor-not-allowed opacity-80"
                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-400/50"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Registering...</span>
              </>
            ) : (
              <>
                <span>Register</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center">
          <hr className="flex-1 border-gray-200" />
          <span className="px-4 text-gray-400 text-sm font-medium uppercase tracking-wider">
            Or
          </span>
          <hr className="flex-1 border-gray-200" />
        </div>

        {/* Google Register */}
        <button
          onClick={handleGoogleRegister}
          disabled={loading}
          className={`w-full border border-gray-300 py-3 rounded-xl hover:bg-gray-50 flex justify-center items-center gap-3 transition duration-200 text-base font-semibold text-gray-700 shadow-sm ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-6 h-6"
          />
          {loading ? "Authenticating..." : "Continue with Google"}
        </button>

        {/* Redirect */}
        <p className="mt-8 text-center text-base text-gray-600 border-t pt-6 border-gray-100">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-600 hover:underline font-bold"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
