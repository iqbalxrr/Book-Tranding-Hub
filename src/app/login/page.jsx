"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";
import { FaLock, FaPhoneAlt, FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, loginWithGoogle } = useAuth();

  // 🔹 Email/Password Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back!",
      });
      router.push("/");
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      await Swal.fire({
        icon: "success",
        title: "Google Login Successful!",
        text: "Welcome back!",
      });
      router.push("/");
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20 flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-50 py-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          Welcome Back 👋
        </h2>

        {/* Email/Password Login Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-md font-medium hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Forgot Password & Phone Login Links */}
        <div className="flex flex-col gap-3 mt-4 text-sm text-center">
          <Link
            href="/forgot-password"
            className="flex justify-center items-center gap-2 text-indigo-600 hover:text-indigo-700 transition"
          >
            <FaLock className="text-indigo-500" />
            Forgot Password?
          </Link>

          <Link
            href="/phone-login"
            className="flex justify-center items-center gap-2 text-indigo-600 hover:text-indigo-700 transition"
          >
            <FaPhoneAlt className="text-indigo-500" />
            Login with Phone OTP
          </Link>
        </div>

        {/* Divider */}
        <div className="my-5 flex items-center">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full border border-gray-300 py-2.5 rounded-md hover:bg-gray-50 flex justify-center items-center gap-2 transition disabled:opacity-50"
        >
           <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Register Redirect */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-indigo-600 hover:underline font-medium"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
