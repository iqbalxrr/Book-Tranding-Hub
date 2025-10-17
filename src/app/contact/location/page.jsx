"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { MapPin, Phone, Mail, Clock, ChevronDown } from "lucide-react";

export default function ContactLocationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [activeFaq, setActiveFaq] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/contact/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thanks for reaching out — we’ll contact you soon.",
        showConfirmButton: false,
        timer: 2500,
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50 pt-0 sm:pt-6 px-6 pb-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section: 1/3 text, 2/3 image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10"
        >
          <div className="grid lg:grid-cols-3 gap-6 items-center">
            {/* Text 1/3 */}
            <div className="order-2 lg:order-1 lg:col-span-1 text-center lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#FF7B6B]">Book Trading Hub</p>
              <h1 className="mt-1 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-gray-900">
                <span className="text-[#FF7B6B]">Connect</span> with our team
              </h1>
              <p className="mt-4 text-base md:text-lg text-gray-700">
                We’re building a friendly marketplace for readers to exchange, donate
                and discover great books. Reach out for support, partnerships, or to
                share feedback about your experience.
              </p>
            </div>
            {/* Team Image (bigger) */}
            <div className="order-1 lg:order-2 lg:col-span-2">
              <img
                src="/teem.jpg"
                alt="Our Team"
                className="w-full h-[300px] md:h-[380px] lg:h-[460px] rounded-3xl shadow-lg object-cover"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#FF7B6B] outline-none"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#FF7B6B] outline-none"
                  required
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#FF7B6B] outline-none"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#FF7B6B] outline-none"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-[#FF7B6B] text-white py-3 rounded-lg font-semibold hover:brightness-95 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right: Contact Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4 mb-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm flex gap-3">
                <MapPin className="w-6 h-6 text-[#FF7B6B]" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-600">123 Library Street, Dhanmondi, Dhaka</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm flex gap-3">
                <Phone className="w-6 h-6 text-[#FF7B6B]" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">+880 1711-123456</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm flex gap-3">
                <Mail className="w-6 h-6 text-[#FF7B6B]" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">support@booktradinghub.com</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm flex gap-3">
                <Clock className="w-6 h-6 text-[#FF7B6B]" />
                <div>
                  <h3 className="font-semibold">Hours</h3>
                  <p className="text-gray-600">Sat–Thu: 9:30 AM – 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100">
              <iframe
                title="Google Map"
                src="https://maps.google.com/maps?q=23.8285203,90.3573289&z=15&output=embed"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mt-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "How can I exchange a book?",
                a: "Create an account, list your book in 'My Books', then send an exchange request from the book details page.",
              },
              {
                q: "Do you charge any fees?",
                a: "No platform fee for direct exchanges. Delivery or meetup costs are handled by users.",
              },
              {
                q: "Where is your hub located?",
                a: "We are at 123 Library Street, Dhanmondi, Dhaka. Visit Sat–Thu, 9:30 AM – 6:00 PM.",
              },
              {
                q: "Can I donate books?",
                a: "Yes! Message us via the form and our team will coordinate pickup or drop-off.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-semibold text-gray-800">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${activeFaq === idx ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === idx && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-5 pb-4 text-gray-600"
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
