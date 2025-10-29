
"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  Users,
  BookOpen,
  Award,
  Headphones,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ContactLocationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: `Something went wrong. Server returned: ${res.status}`,
      });
      return;
    }

    if (data?.success) {
      Swal.fire({
        icon: "success",
        title: "Message Sent",
        text: "✅ Your message was sent successfully!",
      });
      setFormData({ name: "", email: "", message: "" });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Failed to Send",
        text: data?.message || "Unknown error",
      });
    }
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: "error",
      title: "Something went wrong",
      text: "⚠️ Please try again later.",
    });
  } finally {
    setIsSubmitting(false);
  }
};
  // contact info + sections remain same
  const contactInfo = [
    { icon: MapPin, title: "Address", value: "123 Library Street, Dhanmondi, Dhaka" },
    { icon: Phone, title: "Phone", value: "+880 1711-123456" },
    { icon: Mail, title: "Email", value: "support@booktradinghub.com" },
    { icon: Clock, title: "Working Hours", value: "Sat–Thu: 9:30 AM – 6:00 PM" },
  ];

  const services = [
    { icon: Users, title: "Community of Readers", desc: "Join a trusted community of book lovers." },
    { icon: Award, title: "Verified Exchanges", desc: "Safe and verified trading guidelines." },
    { icon: BookOpen, title: "Huge Catalog", desc: "Thousands of titles available to explore." },
    { icon: Headphones, title: "24/7 Support", desc: "We are here to help anytime." },
  ];

  const faq = [
    {
      question: "How do I create an account?",
      answer:
        "Click on the Register button, fill in your name, email, and password, or sign up with Google. You’ll receive a confirmation email shortly.",
    },
    {
      question: "I forgot my password. How can I reset it?",
      answer:
        "Go to the Login page, click 'Forgot Password?', and follow the instructions. You’ll receive a password reset email within seconds.",
    },
    {
      question: "How do I verify my phone number or OTP?",
      answer:
        "During sign-up, you’ll be prompted to enter your phone number. After entering it, you’ll receive an OTP via SMS for verification.",
    },
    {
      question: "Why can’t I sign in with Google?",
      answer:
        "Make sure pop-ups are allowed in your browser and that your Google account is active. Try clearing cache or refreshing the page.",
    },
    {
      question: "How secure is my account information?",
      answer:
        "We use Firebase Authentication and encryption to ensure all your personal data is protected and never shared with third parties.",
    },
  ];

  return (
    <motion.div
      className="min-h-screen py-26 bg-gradient-to-br from-rose-50 via-white to-orange-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
        {/* Banner */}
      <section className="bg-[url('/ratting-bg.jpg')]  py-22 relative">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Contact Us
          </h1>
          <div className="mt-2 text-gray-600">
            <a href="/">Home</a> /{" "}
            <span className="text-red-500">
              <a href="/books">contact us</a>
            </span>
          </div>
        </div>
      </section>

      {/* Main */}
      <div className="container mx-auto px-6 py-20">
        {/* Contact Info & Form */}
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-md border flex items-start gap-4 hover:shadow-lg transition"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-500 flex items-center justify-center">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Map + Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 space-y-8"
          >
            {/* Map */}
            <div className="relative rounded-2xl overflow-hidden shadow-md border">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.879313724447!2d90.35732887532836!3d23.82852037864982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c149c4a6f0e3%3A0xa50247657d3f90cc!2sDhanmondi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>

            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-md border flex flex-col gap-4"
            >
              <h2 className="text-2xl font-semibold text-center text-gray-900">
                Send a Message
              </h2>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-300 outline-none"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-300 outline-none"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={5}
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-300 outline-none"
                required
              />
              <motion.button
                whileTap={{ scale: 0.97 }}
                disabled={isSubmitting}
                className={`bg-rose-500 text-white font-semibold px-4 py-2 rounded-lg shadow transition ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:brightness-95"
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* FAQ */}
        <section className="min-h-[80vh] w-full bg-gradient-to-b  py-20 mt-20 rounded-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faq.map((item, idx) => (
                <motion.details
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-lg border hover:shadow-xl cursor-pointer"
                >
                  <summary className="font-semibold text-lg text-gray-900">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-gray-600">{item.answer}</p>
                </motion.details>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
}
