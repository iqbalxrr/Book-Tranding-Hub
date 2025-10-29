"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "firebase/auth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, loginWithGoogle, loading } = useAuth();
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = await register(email, password);
      await updateProfile(user, { displayName: name });

      Swal.fire({
        icon: "success",
        title: "Account Created Successfully!",
        timer: 1300,
        showConfirmButton: false,
      });
      router.push("/login");
    } catch (err) {
      Swal.fire({ icon: "error", title: "Register Failed", text: err.message });
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      Swal.fire({
        icon: "success",
        title: "Google Login Successful!",
        timer: 1200,
        showConfirmButton: false,
      });
      router.push("/");
    } catch (error) {
      Swal.fire({ icon: "error", title: "Google Login Failed", text: error.message });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-white to-indigo-200 flex items-center justify-center mt-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Please wait..." : "Register"}
          </button>
        </form>

        <div className="mt-6 flex items-center gap-3">
          <hr className="flex-1 border-gray-300" />
          <span className="text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition mt-5"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-6 h-6"
          />
          Continue with Google
        </button>

        <p className="text-center mt-6 text-gray-700 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
