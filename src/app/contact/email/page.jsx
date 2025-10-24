"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
      {/* Team Image */}
      <section className="relative mt-20 overflow-hidden py-12">
        <img
          src="/teem.jpg"
          alt="Our Team"
          className="mx-auto w-11/12 md:w-4/5 lg:w-3/5 h-96 object-cover rounded-3xl shadow-lg"
        />
      </section>

      {/* Hero Section */}
      <section className="relative py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in{" "}
            <span className="bg-gradient-to-r from-[#FF7B6B] via-rose-500 to-orange-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-[#FF7B6B] font-medium">
            Sharing stories. Swapping favorites. Supporting readers.
          </p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactInfo.map((info, idx) => (
          <motion.div
            key={idx}
            className={`bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col items-center text-center`}
            whileHover={{ scale: 1.05 }}
          >
            <div
              className={`p-4 mb-3 rounded-full bg-gradient-to-br ${info.color} text-white`}
            >
              <info.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold">{info.title}</h3>
            <p className="text-gray-600">{info.details}</p>
            <span className="text-sm text-gray-400">{info.description}</span>
          </motion.div>
        ))}
      </section>

      {/* Contact Form */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 shadow-lg flex flex-col gap-6 border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Send Us a Message
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
              required
            />
          </div>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#FF7B6B] via-rose-500 to-orange-500 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:brightness-95 transition"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-4 mb-3 rounded-full bg-rose-100 text-[#FF7B6B]">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
