"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Navigation, Users, BookOpen, Award, Headphones, Facebook, Twitter, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactLocationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Message sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: MapPin, title: "Address", value: "123 Library Street, Dhanmondi, Dhaka, Bangladesh" },
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
    { question: "Where is your office located?", answer: "Our office is at 123 Library Street, Dhanmondi, Dhaka." },
    { question: "How do I contact support?", answer: "You can email support@booktradinghub.com or call +880 1711-123456." },
    { question: "What are your working hours?", answer: "We operate from Sat–Thu: 9:30 AM – 6:00 PM." },
    { question: "Is it safe to exchange books?", answer: "Yes! Always meet in public places. Verified users are highlighted in our system." },
  ];

  return (
    <motion.div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50">
      {/* Hero Image */}
      <section className="relative h-[400px] w-full overflow-hidden rounded-b-3xl shadow-lg">
        <img
          src="/team-header.jpg"
          alt="Team Header"
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Contact <span className="text-rose-400">Book Trading Hub</span>
          </motion.h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Info */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet at our office, libraries, or nearby cafes. We ensure safe, public spaces for all exchanges.
          </p>
        </motion.div>

        {/* Contact Info + Map + Form */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-500 flex items-center justify-center">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Map & Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Map */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-md">
              <motion.div
                className="absolute z-10 top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-rose-500 shadow"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <MapPin className="w-4 h-4" /> Dhaka Office
              </motion.div>
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.879313724447!2d90.35732887532836!3d23.82852037864982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c149c4a6f0e3%3A0xa50247657d3f90cc!2sDhanmondi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
              <div className="absolute z-10 bottom-4 left-4">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=123%20Library%20Street%2C%20Dhanmondi%2C%20Dhaka%2C%20Bangladesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-500 text-white text-sm shadow hover:brightness-95 transition"
                >
                  <Navigation className="w-4 h-4" /> Get Directions
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col gap-4"
            >
              <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">Send a Message</h2>
              <input type="text" placeholder="Your Name" className="border border-gray-300 rounded-lg px-3 py-2" required />
              <input type="email" placeholder="Your Email" className="border border-gray-300 rounded-lg px-3 py-2" required />
              <textarea placeholder="Your Message" rows={5} className="border border-gray-300 rounded-lg px-3 py-2" required></textarea>
              <button className="bg-rose-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:brightness-95 transition">
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Services */}
        <section className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col items-center text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-4 mb-3 rounded-full bg-rose-100 text-rose-500">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* FAQ Section */}
        <section className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faq.map((item, idx) => (
              <details key={idx} className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                <summary className="font-semibold cursor-pointer text-gray-900">{item.question}</summary>
                <p className="mt-2 text-gray-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Social Media */}
        <section className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
          <div className="flex justify-center gap-6 text-rose-500">
            <a href="#" className="hover:text-rose-600 transition"><Facebook className="w-6 h-6" /></a>
            <a href="#" className="hover:text-rose-600 transition"><Twitter className="w-6 h-6" /></a>
            <a href="#" className="hover:text-rose-600 transition"><Instagram className="w-6 h-6" /></a>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
