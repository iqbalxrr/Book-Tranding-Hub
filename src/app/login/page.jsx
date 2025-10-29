"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginWithGoogle, authLoading } = useAuth();
  const router = useRouter();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      Swal.fire({ icon: "success", title: "Login successful", timer: 1400, showConfirmButton: false });
      router.push("/");
    } catch (err) {
      Swal.fire({ icon: "error", title: "Login failed", text: err.message || "Try again" });
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      Swal.fire({ icon: "success", title: "Google sign-in", timer: 1200, showConfirmButton: false });
      router.push("/");
    } catch (err) {
      Swal.fire({ icon: "error", title: "Google failed", text: err.message || "Try again" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome back</h2>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-indigo-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full border rounded-md pl-10 pr-3 py-2"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-indigo-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full border rounded-md pl-10 pr-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className={`w-full py-2 rounded-md text-white font-semibold ${
              authLoading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {authLoading ? <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin" /> Processing...</span> : <span className="flex items-center justify-center gap-2">Login <ArrowRight /></span>}
          </button>
        </form>

        <div className="my-4 text-center text-sm">
          <Link href="/forgot-password" className="text-indigo-600 hover:underline mr-4">Forgot password?</Link>
          <Link href="/phone-login" className="text-indigo-600 hover:underline">Phone login</Link>
        </div>

        <div className="flex items-center gap-3">
          <hr className="flex-1" />
          <span className="text-sm text-gray-400">OR</span>
          <hr className="flex-1" />
        </div>

        <button
          onClick={handleGoogle}
          disabled={authLoading}
          className="w-full mt-4 py-2 border rounded-md flex items-center justify-center gap-2"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="text-center text-sm mt-4">
          Don't have an account? <Link href="/register" className="text-indigo-600">Register</Link>
        </p>
      </div>
    </div>
  );
}
