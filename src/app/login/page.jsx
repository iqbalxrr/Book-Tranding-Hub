"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";
import { Lock, Mail, Phone, Loader2, ArrowRight } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="w-full max-w-md  p-10  transition-all duration-300 hover:shadow-3xl">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Welcome Back 👋
          </h2>
          <p className="mt-2 text-lg text-indigo-600 font-medium">
            Securely sign in to your account
          </p>
        </div>

        {/* Email/Password Login Form */}
        <form onSubmit={handleEmailLogin} className="space-y-5">
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
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Login</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </>
            )}
          </button>
        </form>

        {/* Separator */}
        <div className="my-8 flex items-center">
          <hr className="flex-1 border-gray-200" />
          <span className="px-4 text-gray-400 text-sm font-medium uppercase tracking-wider">
            Or
          </span>
          <hr className="flex-1 border-gray-200" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
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
          {loading ? "Authenticating..." : "Sign in with Google"}
        </button>

        {/* Links */}
        <div className="flex justify-between items-center mt-6 text-sm">
          <Link
            href="/forgot-password"
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 transition font-medium"
          >
            <Lock className="w-4 h-4 text-indigo-500" />
            Forgot Password?
          </Link>

          <Link
            href="/phone-login"
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 transition font-medium"
          >
            <Phone className="w-4 h-4 text-indigo-500" />
            Login with Phone OTP
          </Link>
        </div>

        {/* Register Redirect */}
        <p className="mt-8 text-center text-base text-gray-600 border-t pt-6 border-gray-100">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-indigo-600 hover:underline font-bold"
          >
            Create a free account
          </Link>
        </p>
      </div>
    </div>
  );
}
