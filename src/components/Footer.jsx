
// src/components/Footer.jsx
"use client";

import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white  py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo + Contact */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-[#FF7B6B] w-10 h-10 flex items-center justify-center rounded-full text-white font-bold">
              📚
            </div>
            <h2 className="text-xl font-bold text-gray-900">Book Hub</h2>
          </div>
          <p className="text-gray-500 mb-2">Got Questions? Call us</p>
          <p className="text-lg font-semibold text-gray-900 mb-4">+670 413 90 762</p>

          <p className="flex items-center gap-2 text-gray-600 mb-2">
            <Mail size={16} /> readit@gmail.com
          </p>
          <p className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} /> 79 Sleepy Hollow St. <br />
            Jamaica, New York 1432
          </p>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Customers Support
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>Store List</li>
            <li>Opening Hours</li>
            <li>Contact Us</li>
            <li>Return Policy</li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Categories
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>Novel Books</li>
            <li>Poetry Books</li>
            <li>Political Books</li>
            <li>History Books</li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Subscribe.
          </h3>
          <p className="text-gray-500 mb-3">
            Our conversation is just getting started
          </p>
          <div className="flex mb-4">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="flex-1 px-3 py-2 border rounded-l-lg outline-none"
            />
            <button className="bg-[#FF7B6B] text-white px-4 rounded-r-lg hover:bg-[#ff6650]">
              Subscribe
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3">
            <a href="#" className="p-2 border rounded-md hover:bg-gray-100">
              <Facebook size={16} />
            </a>
            <a href="#" className="p-2 border rounded-md hover:bg-gray-100">
              <Twitter size={16} />
            </a>
            <a href="#" className="p-2 border rounded-md hover:bg-gray-100">
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t pt-6 flex flex-col md:flex-row justify-between items-center container mx-auto px-6 text-gray-500 text-sm">
        <p>© All Rights Reserved 2025 By <span className="text-[#FF7B6B]">Book Hub</span>.</p>

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Image src="/paypal.png" alt="PayPal" width={50} height={20} />
          <Image src="/visa.png" alt="Visa" width={50} height={20} />
          <Image src="/mastercard.png" alt="MasterCard" width={50} height={20} />
          <Image src="/stripe.png" alt="Stripe" width={50} height={20} />
        </div>
      </div>
    </footer>
  );
}
