"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2"; // Assuming Swal is correctly set up
import { MapPin, Phone, Mail, Clock, ChevronDown, Send } from "lucide-react"; // Added Send icon

export default function ContactLocationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [activeFaq, setActiveFaq] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // --- Mock API Call ---
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const success = Math.random() > 0.1; // 90% chance of success

    if (success) {
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
    setIsSubmitting(false);
    // --- End Mock API Call ---
  };

  const primaryColor = "#F97316"; // Tailwind 'orange-600' for a more vibrant, professional orange/red

  // Variant for staggered children animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Variant for individual item animation
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 font-['Inter']"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 md:pt-40 md:pb-24 bg-white ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Text Content */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-5 text-center lg:text-left"
            >
              <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-2">
                Book Trading Hub
              </p>
              <h1 className="mt-1 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900">
                Let's <span className="text-orange-600">Connect</span> &
                Collaborate
              </h1>
              <p className="mt-4 text-base md:text-lg text-gray-600 max-w-lg lg:max-w-none mx-auto lg:mx-0">
                We're building a vibrant community for readers to exchange and
                discover great books. Reach out to our dedicated team for
                support, partnerships, or to share your feedback.
              </p>
            </motion.div>

            {/* Image Section */}
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <img
                src="/teem.jpg"
                alt="Our Team Collaborating"
                className="w-full h-[300px] md:h-[420px] lg:h-[500px] rounded-3xl object-cover shadow-2xl shadow-orange-200/50 transform translate-y-4 md:translate-y-0 border-4 border-white"
                style={{ objectPosition: "center 20%" }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content: Form, Info, Map */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10  h-full">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition duration-200 shadow-sm"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition duration-200 shadow-sm"
                  required
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject of Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition duration-200 shadow-sm"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Tell us how we can help..."
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition duration-200 shadow-sm"
                  required
                ></textarea>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center space-x-2 py-4 rounded-xl font-bold text-lg shadow-md transition duration-300 transform hover:scale-[1.005] ${
                    isSubmitting
                      ? "bg-orange-400 text-white cursor-not-allowed"
                      : "bg-orange-600 text-white hover:bg-orange-700 shadow-orange-400/50"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right: Contact Info + Map */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: MapPin,
                  title: "Our Location",
                  text: "123 Library Street, Dhanmondi, Dhaka",
                },
                { icon: Phone, title: "Call Us", text: "+880 1711-123456" },
                {
                  icon: Mail,
                  title: "Email Support",
                  text: "support@booktradinghub.com",
                },
                {
                  icon: Clock,
                  title: "Operating Hours",
                  text: "Sat–Thu: 9:30 AM – 6:00 PM",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transition duration-300 hover:shadow-xl hover:border-orange-200"
                >
                  <item.icon className={`w-8 h-8 text-orange-600 mb-2`} />
                  <h3 className="font-bold text-lg text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Map Section */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-gray-100">
              <iframe
                title="Google Map"
                src="https://maps.google.com/maps?q=23.8285203,90.3573289&z=15&output=embed"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className=" container mx-auto mt-24"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Left Column – General Questions */}
            <div>
              <h3 className="text-2xl font-bold text-orange-600 mb-6">
                General Questions
              </h3>
              <div className="space-y-4">
                {[
                  {
                    q: "How can I exchange a book?",
                    a: "Create an account, list your book in 'My Books', and send an exchange request from another book's details page.",
                  },
                  {
                    q: "Do you charge any platform fees?",
                    a: "No, our platform is free for book exchanges. Only delivery or meetup costs, if any, are handled between users.",
                  },
                  {
                    q: "Can I donate books for charity?",
                    a: "Yes, we collaborate with local literacy programs. Contact us and we’ll schedule a pickup or drop-off.",
                  },
                  {
                    q: "What are your operating hours?",
                    a: "We’re open Saturday to Thursday, 9:30 AM – 6:00 PM. Closed on Fridays for maintenance.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setActiveFaq(
                          activeFaq === `left-${idx}` ? null : `left-${idx}`
                        )
                      }
                      className={`w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-lg ${
                        activeFaq === `left-${idx}`
                          ? "text-orange-600 bg-orange-50"
                          : "text-gray-800"
                      }`}
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-6 h-6 transition-transform ${
                          activeFaq === `left-${idx}`
                            ? "rotate-180 text-orange-600"
                            : "text-gray-500"
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {activeFaq === `left-${idx}` && (
                        <motion.div
                          key="content"
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 },
                          }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-4 text-gray-600 text-base border-t border-gray-100"
                        >
                          <p className="pt-2">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column – Account & Technical Help */}
            <div>
              <h3 className="text-2xl font-bold text-orange-600 mb-6">
                Account & Technical Help
              </h3>
              <div className="space-y-4">
                {[
                  {
                    q: "How do I reset my password?",
                    a: "Click 'Forgot Password' on the login page. You’ll receive a reset link at your registered email address.",
                  },
                  {
                    q: "My exchange request didn’t go through — what should I do?",
                    a: "Check your internet connection and try again. If the issue persists, contact support@booktradinghub.com.",
                  },
                  {
                    q: "How do I edit or delete my book listing?",
                    a: "Go to 'My Books' > select the book you want to edit or delete using the respective options.",
                  },
                  {
                    q: "Can I access the platform from mobile devices?",
                    a: "Yes! Our website is fully mobile responsive, and a dedicated app is under development.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setActiveFaq(
                          activeFaq === `right-${idx}` ? null : `right-${idx}`
                        )
                      }
                      className={`w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-lg ${
                        activeFaq === `right-${idx}`
                          ? "text-orange-600 bg-orange-50"
                          : "text-gray-800"
                      }`}
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-6 h-6 transition-transform ${
                          activeFaq === `right-${idx}`
                            ? "rotate-180 text-orange-600"
                            : "text-gray-500"
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {activeFaq === `right-${idx}` && (
                        <motion.div
                          key="content"
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 },
                          }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-4 text-gray-600 text-base border-t border-gray-100"
                        >
                          <p className="pt-2">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
