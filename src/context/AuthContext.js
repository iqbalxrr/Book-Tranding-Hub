"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider, signOutUser } from "@/lib/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  sendPasswordResetEmail,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false); // UI action loader
  const [confirmationResult, setConfirmationResult] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  // Email / Password login
  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      return res.user;
    } finally {
      setAuthLoading(false);
    }
  };

  // Register with email / password
  const register = async (email, password) => {
    setAuthLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      return res.user;
    } finally {
      setAuthLoading(false);
    }
  };

  // Google Sign-in (non-blocking save to your DB)
  const loginWithGoogle = async () => {
    setAuthLoading(true);
    try {
      const provider = googleProvider || new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const gUser = res.user;

      // non-blocking save to your backend (if you have /api/saveUser)
      fetch("/api/saveUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: gUser.displayName,
          email: gUser.email,
          image: gUser.photoURL,
          provider: "google",
        }),
      }).catch((err) => console.warn("saveUser failed:", err));

      setUser(gUser);
      return gUser;
    } finally {
      setAuthLoading(false);
    }
  };

  // Send password reset email
  const resetPassword = async (email) => {
    setAuthLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setAuthLoading(true);
    try {
      await signOutUser();
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  // Phone recaptcha + OTP
  const setupRecaptcha = () => {
    if (typeof window === "undefined") return;
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );
    }
  };

  const sendOtp = async (phoneNumber) => {
    setupRecaptcha();
    setAuthLoading(true);
    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      return confirmation;
    } finally {
      setAuthLoading(false);
    }
  };

  const verifyOtp = async (otp) => {
    setAuthLoading(true);
    try {
      if (!confirmationResult) throw new Error("No OTP request found");
      const res = await confirmationResult.confirm(otp);
      setUser(res.user);
      return res.user;
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        login,
        register,
        loginWithGoogle,
        logout,
        sendOtp,
        verifyOtp,
        resetPassword,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
