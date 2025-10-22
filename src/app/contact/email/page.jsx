"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Users,
  Award,
  BookOpen,
  Headphones,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Save to MongoDB via /api/contact route
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Thanks for reaching out — we'll get back to you soon 😊",
          timer: 2500,
          showConfirmButton: false,
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Something went wrong. Please try again.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Server Error!",
        text: "Unable to send message. Try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "support@booktradinghub.com",
      description: "We reply within 24 hours",
      color: "from-[#FF7B6B] to-rose-400",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Mon–Fri from 8am to 6pm",
      color: "from-emerald-500 to-teal-400",
    },
    {
      icon: MapPin,
      title: "Visit Our Hub",
      details: "123 Readers Lane, Library City",
      description: "Come say hello at our office",
      color: "from-amber-500 to-orange-400",
    },
    {
      icon: Clock,
      title: "Response Time",
      details: "Within 24 Hours",
      description: "We respond to all inquiries quickly",
      color: "from-[#FF7B6B] to-rose-400",
    },
  ];

  const features = [
    {
      icon: Users,
      title: "Community of Book Lovers",
      description:
        "Join a trusted community of readers exchanging books in your area.",
    },
    {
      icon: Award,
      title: "Verified Exchanges",
      description:
        "We verify profiles and provide clear guidelines to keep trades safe.",
    },
    {
      icon: BookOpen,
      title: "Huge Catalog",
      description:
        "Discover thousands of titles shared by the community across every genre.",
    },
    {
      icon: Headphones,
      title: "Friendly Support 24/7",
      description:
        "Need help with a trade, listing, or report? We’re here anytime.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50">
      {/* ✅ Group Photo Added */}
      <section className="relative overflow-hidden">
        <img
          src="/teem.jpg"
          alt="Our Team"
          className="w-full container mx-auto   h-[900] object-cover rounded-b-3xl shadow-lg"
        />
      </section>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF7B6B]/20 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
          <div
            className="absolute top-40 right-10 w-96 h-96 bg-rose-300/20 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/3 w-80 h-80 bg-orange-300/20 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF7B6B]/10 text-[#FF7B6B] text-sm font-semibold mb-4">
              <BookOpen className="w-4 h-4" /> Book Trading Hub Support
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Get in{" "}
              <span className="bg-gradient-to-r from-[#FF7B6B] via-rose-500 to-orange-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-[#FF7B6B] font-medium">
              Sharing stories. Swapping favorites. Supporting readers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Existing content below unchanged (form + features + FAQ) */}
      {/* ... keep your previous JSX content from here ... */}
    </div>
  );
}
