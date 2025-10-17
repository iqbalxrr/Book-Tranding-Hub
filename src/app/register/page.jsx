"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { toast, Toaster } from "react-hot-toast";
import { auth, googleProvider } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { useAuth } from "@/context/AuthContext"; 
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginWithGoogle } = useAuth(); 
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Email & Password Registration
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

  // Google Sign-In
   // Google Sign-In
    // Google Sign-In
  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      // Firebase Google login
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save user in MongoDB
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          password: "google-auth",
        }),
      });

      // ✅ SweetAlert success message
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
      // ❌ Error alert
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



  return (
    <div className="min-h-screen mt-25 lg:mt-14 flex items-center justify-center bg-gray-100">
      <Toaster position="top-right" />
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="my-4 flex items-center">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <button
          onClick={handleGoogleRegister}
          disabled={loading}
          className="w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 flex justify-center items-center gap-2 disabled:opacity-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
