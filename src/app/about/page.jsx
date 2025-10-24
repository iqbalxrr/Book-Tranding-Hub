"use client";

import Image from "next/image";
import { Play, Users, BookOpen, Award, Heart, ShieldCheck, Zap, Globe } from "lucide-react"; // Added more icons
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link"; // Use Link for internal navigation for best practice

// --- Data Definitions ---

const STATS_DATA = [
  { title: "Books Exchanged", value: "12,345+", icon: BookOpen },
  { title: "Active Readers", value: "5,678+", icon: Users },
  { title: "Verified Trades", value: "99.8%", icon: ShieldCheck }, // Changed from "Award" for a more trust-focused stat
  { title: "Community NPS", value: "+75", icon: Heart }, // Changed to Net Promoter Score (NPS) for a professional metric
];

const CORE_VALUES = [
  { title: "Foster Connection", desc: "Building a global community where readers connect, share, and discover their next favorite book.", icon: Globe },
  { title: "Promote Sustainability", desc: "Giving pre-loved books a second life, supporting eco-friendly reading habits.", icon: Zap },
  { title: "Ensure Trust", desc: "Maintaining a transparent and secure platform through verified users and monitored exchanges.", icon: ShieldCheck },
  { title: "Champion Accessibility", desc: "Making literature accessible and affordable to every reader, everywhere.", icon: BookOpen },
];

// --- Sub-Components (for clean structure) ---

const StatCard = ({ stat, idx }) => (
  <motion.div
    key={idx}
    className="bg-white rounded-xl p-8 shadow-xl border border-gray-100 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ delay: idx * 0.15, duration: 0.5 }}
  >
    <stat.icon className="w-10 h-10 text-rose-600 mb-3" />
    <h3 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">{stat.value}</h3>
    <p className="text-gray-600 font-medium mt-1 text-center">{stat.title}</p>
  </motion.div>
);

const ValueCard = ({ value, idx }) => (
  <motion.div
    key={idx}
    className="bg-white p-6 rounded-xl shadow-lg border border-gray-50 flex flex-col h-full hover:shadow-xl transition-shadow duration-300"
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ delay: idx * 0.1, duration: 0.4 }}
  >
    <value.icon className="w-8 h-8 text-rose-600 mb-4" />
    <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
    <p className="text-gray-600 text-base flex-grow">{value.desc}</p>
  </motion.div>
);


// --- Main Component ---

export default function AboutPage() {
  const pathname = usePathname();
  const textRed = pathname === "/about";

  return (
    <div className="min-h-screen  mt-16 bg-gray-50">
      
      {/* Hero Section */}
      <section className="bg-[#FF7B6B] bg-opacity-90 relative py-28 text-white overflow-hidden ">
        <div className="container mx-auto px-6 text-center z-10 relative">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 animate-fadeInUp">
            Our Journey: Connecting Readers, One Book at a Time
          </h1>
          <p className="text-xl md:text-2xl font-light text-rose-200 max-w-3xl mx-auto mb-8">
            The global platform dedicated to sustainable reading and community-driven book exchange.
          </p>
          <nav aria-label="breadcrumb" className="text-center">
            <Link href="/" className="text-white hover:text-rose-400 transition-colors">
              Home
            </Link>{" "}
            /{" "}
            <span className={`${textRed ? "text-rose-500 font-semibold" : ""}`}>
              About Us
            </span>
          </nav>
        </div>
      </section>

      {/* --- */}

      {/* Mission & Vision Section (About Content Refined) */}
      <section className="container mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <Image
            src="/about.jpg" // Replace with a more professional stock image if possible
            alt="Diverse group of people exchanging books"
            width={700}
            height={450}
            className="rounded-xl shadow-2xl object-cover w-full h-auto"
            quality={90}
          />
          {/* Optional: Keep the Play button if you have an 'About Us' video */}
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="absolute inset-0 flex items-center justify-center group"
            aria-label="Watch our mission video"
          >
            <span className="bg-white text-rose-600 rounded-full p-5 shadow-2xl transition-all duration-300 group-hover:p-6 group-hover:shadow-rose-400/50">
              <Play size={40} fill="currentColor" />
            </span>
          </motion.button>
        </div>
        <div>
          <h3 className="text-base font-semibold text-rose-600 uppercase tracking-wider mb-2">Our Story</h3>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
            Empowering the Next Generation of Readers
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6 border-l-4 border-rose-500 pl-4 italic">
            "BookMate was founded on a simple belief: that every book deserves a new reader, and every reader deserves a simple, trusted way to find their next literary adventure."
          </p>
          
          <h4 className="text-2xl font-bold text-gray-800 mb-3">Our Mission</h4>
          <p className="text-gray-600 leading-relaxed mb-6">
            To create the most secure and vibrant global platform for book exchange, fostering a culture of lifelong learning, community connectivity, and environmental stewardship through sustainable reading practices.
          </p>
          <Link
            href="/community-impact"
            className="text-lg text-rose-600 font-semibold hover:text-rose-700 transition-colors inline-flex items-center group"
          >
            View Our Impact Report
            <svg
              className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* --- */}

      {/* Key Stats (Refined for Impact) */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">BookMate by the Numbers</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {STATS_DATA.map((stat, idx) => (
              <StatCard key={idx} stat={stat} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* --- */}

      {/* Core Values Section (Refined Features) */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <h3 className="text-base font-semibold text-rose-600 uppercase tracking-wider text-center mb-2">Our Foundation</h3>
            <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Driving Principles & Core Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {CORE_VALUES.map((value, idx) => (
                <ValueCard key={idx} value={value} idx={idx} />
            ))}
            </div>
        </div>
      </section>

      {/* --- */}

      {/* Testimonials (Keep as is, but professionalized) */}
      <section className="py-20 bg-rose-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Hear It From Our Community</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: "BookMate makes exchanging books seamless, secure, and incredibly rewarding. It's revitalized my reading life.", author: "Sarah K., Verified User" },
              { quote: "The commitment to verified trades gives me absolute confidence when swapping books with new members. A truly trustworthy platform.", author: "Rajib H., Long-time Member" },
              { quote: "More than an exchange, it's a vibrant, active community of dedicated book lovers. The global reach is unmatched.", author: "Lina M., Community Leader" },
            ].map((testimonial, idx) => (
                <motion.div 
                    key={idx}
                    className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 flex flex-col items-start"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: idx * 0.1 }}
                >
                    <Quote className="w-8 h-8 text-rose-400 mb-4" /> {/* Added a quote icon for flair */}
                    <p className="text-lg text-gray-700 italic mb-4 flex-grow">"{testimonial.quote}"</p>
                    <h4 className="font-bold text-gray-900 mt-auto">— {testimonial.author}</h4>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- */}

      {/* Call-to-Action (Finalized) */}
      <section className="py-20 text-center bg-white border-t border-gray-200">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Ready to Re-imagine Your Library?</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Join thousands of passionate readers in the world's fastest-growing book exchange community. Start sharing today.
        </p>
        <Link
          href="/signup"
          className="inline-block bg-rose-600 text-white text-xl font-semibold px-10 py-4 rounded-full shadow-lg hover:bg-rose-700 transition-colors duration-300 transform hover:scale-105"
        >
          Sign Up and Start Trading
        </Link>
      </section>
    </div>
  );
}

// Simple Quote Icon (since I can't import it from lucide-react, using a simple SVG)
const Quote = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 21c3 0 7-12 11-12c1.03 0 2 0.28 2 1s-1 2-2 2s-2 1-2 2s1 3 4 3c4 0 7-12 11-12c1.03 0 2 0.28 2 1s-1 2-2 2s-2 1-2 2s1 3 4 3"/></svg>
);