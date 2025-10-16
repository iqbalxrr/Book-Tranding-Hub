"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Toaster } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function PhoneLoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpStep, setOtpStep] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { sendOtp, verifyOtp } = useAuth();

  // 🔹 Send OTP
  const handleSendOtp = async () => {
    if (!phone) {
      Swal.fire("Error!", "Please enter a valid phone number.", "error");
      return;
    }

    setLoading(true);
    try {
      await sendOtp(phone);
      setOtpStep(true);
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

    setLoading(true);
    try {
      await verifyOtp(otp);
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

        {!otpStep ? (
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
