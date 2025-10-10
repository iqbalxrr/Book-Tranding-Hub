"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";

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
      router.push("/"); // redirect
    } catch (err) {
      console.error(err);
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
      router.push("/"); // redirect
    } catch (err) {
      console.error(err);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 mt-10">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Email/Password Login Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Links for Forgot Password & Phone OTP */}
        <div className="flex justify-between mt-2 text-sm">
          <Link href="/forgot-password" className="text-indigo-600 hover:underline">
            Forgot Password?
          </Link>
          <Link href="/phone-login" className="text-indigo-600 hover:underline">
            Login with Phone
          </Link>
        </div>

        {/* Divider */}
        <div className="my-4 flex items-center">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 flex justify-center items-center gap-2 disabled:opacity-50 mb-4"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Register Redirect */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-indigo-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
