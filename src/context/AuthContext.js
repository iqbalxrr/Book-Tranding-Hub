"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, signOutUser } from "@/lib/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Email/Password login
  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    setUser(res.user);
    return res.user;
  };

  // Google login
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    setUser(res.user);
    return res.user;
  };

  // Email/Password register
  const register = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    setUser(res.user);
    return res.user;
  };

  const logout = async () => {
    await signOutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, loginWithGoogle, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
