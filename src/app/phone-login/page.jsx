"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase"; // আপনার firebase instance
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"; // <-- এইভাবে আলাদা import
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function PhoneLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const router = useRouter();

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );
    }
  };

  const sendOtp = async () => {
    if (!phone) {
      toast.error("Please enter a phone number");
      return;
    }
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    try {
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      toast.success("OTP sent to " + phone);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }
    try {
      const userCredential = await confirmationResult.confirm(otp);

      // Save user to MongoDB
      await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: userCredential.user.uid,
          name: userCredential.user.phoneNumber,
          email: "", // phone login doesn't have email
          provider: "phone",
        }),
      });

      toast.success("Phone verified and logged in!");
      setTimeout(() => router.push("/"), 1500); // redirect after login
    } catch (err) {
      console.error(err);
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-4">Login with Phone OTP</h2>

      <input
        type="tel"
        placeholder="+8801XXXXXXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border px-3 py-2 rounded-md mb-2"
      />
      <button
        onClick={sendOtp}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md mb-4"
      >
        Send OTP
      </button>

      {confirmationResult && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border px-3 py-2 rounded-md mb-2"
          />
          <button
            onClick={verifyOtp}
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Verify OTP
          </button>
        </>
      )}

      <div id="recaptcha-container"></div>
    </div>
  );
}
