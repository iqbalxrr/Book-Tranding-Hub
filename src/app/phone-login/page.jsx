"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function PhoneLoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🔹 Setup reCAPTCHA
  const setupRecaptcha = () => {
    if (typeof window !== "undefined" && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );
    }
    return window.recaptchaVerifier;
  };

  // 🔹 Send OTP
  const handleSendOtp = async () => {
    if (!phone) {
      Swal.fire("Error!", "Please enter a valid phone number.", "error");
      return;
    }

    setLoading(true);
    try {
      const appVerifier = setupRecaptcha();
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      Swal.fire("OTP Sent!", "Check your phone for the verification code.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", err.message || "Failed to send OTP.", "error");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      Swal.fire("Error!", "Please enter the OTP.", "error");
      return;
    }

    if (!confirmationResult) {
      Swal.fire("Error!", "Please request OTP first.", "error");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await confirmationResult.confirm(otp);

      // Save user to MongoDB
      await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: userCredential.user.uid,
          name: userCredential.user.phoneNumber,
          email: "",
          provider: "phone",
        }),
      });

      Swal.fire("Success!", "Phone verified and logged in!", "success");
      router.push("/"); // redirect after login
    } catch (err) {
      console.error(err);
      Swal.fire("Invalid OTP!", err.message || "Verification failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster position="top-right" />
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Phone OTP Login</h2>

        {!confirmationResult ? (
          <>
            <input
              type="tel"
              placeholder="+8801XXXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mb-4"
            />
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mb-4"
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
