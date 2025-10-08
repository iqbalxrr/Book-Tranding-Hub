"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, signOutUser } from "@/lib/firebase";
import {
onAuthStateChanged,
signInWithEmailAndPassword,
GoogleAuthProvider,
signInWithPopup,
createUserWithEmailAndPassword,
RecaptchaVerifier,
signInWithPhoneNumber,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [confirmationResult, setConfirmationResult] = useState(null);

// 🔹 Track user state change
useEffect(() => {
const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
setUser(currentUser);
setLoading(false);
});
return () => unsubscribe();
}, []);

// 🔹 Email/Password login
const login = async (email, password) => {
const res = await signInWithEmailAndPassword(auth, email, password);
setUser(res.user);
return res.user;
};

// 🔹 Google login (also save to MongoDB)
const loginWithGoogle = async () => {
const provider = new GoogleAuthProvider();
const res = await signInWithPopup(auth, provider);
const user = res.user;

```
// ✅ Save user to MongoDB via API
try {
  await fetch("/api/saveUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
      provider: "google",
    }),
  });
} catch (err) {
  console.error("❌ Failed to save Google user:", err);
}

setUser(user);
return user;
```

};

// 🔹 Email/Password register
const register = async (email, password) => {
const res = await createUserWithEmailAndPassword(auth, email, password);
setUser(res.user);
return res.user;
};

// 🔹 Logout
const logout = async () => {
await signOutUser();
setUser(null);
};

// 🔹 Setup reCAPTCHA for phone verification
const setupRecaptcha = () => {
if (!window.recaptchaVerifier) {
window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
size: "invisible",
callback: (response) => {
console.log("reCAPTCHA verified");
},
});
}
};

// 🔹 Send OTP to phone
const sendOtp = async (phoneNumber) => {
setupRecaptcha();
const appVerifier = window.recaptchaVerifier;
try {
const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
setConfirmationResult(confirmation);
return confirmation;
} catch (error) {
console.error("❌ Error sending OTP:", error);
throw error;
}
};

// 🔹 Verify OTP
const verifyOtp = async (otp) => {
if (!confirmationResult) throw new Error("No OTP request found");
try {
const res = await confirmationResult.confirm(otp);
setUser(res.user);
return res.user;
} catch (error) {
console.error("❌ Invalid OTP:", error);
throw error;
}
};

return (
<AuthContext.Provider
value={{
user,
setUser,
login,
loginWithGoogle,
register,
logout,
sendOtp,
verifyOtp,
loading,
}}
>
{children}
</AuthContext.Provider>
);
};

export const useAuth = () => useContext(AuthContext);
