import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#F5BAC7] text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Baby Moo</h2>
            <p className="text-pink-100">
              Your one-stop destination for high-quality baby products. We're here to bring joy to you and your little ones.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-pink-200 transition">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-white hover:text-pink-200 transition">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-white hover:text-pink-200 transition">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Customer Care</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaClock className="mt-1 mr-3 text-pink-200" />
                <span>10 AM - 7 PM (Mon - Sat)</span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-3 text-pink-200" />
                <span>BabyMoo@gmail.com</span>
              </li>
              <li className="flex items-start">
                <FaPhoneAlt className="mt-1 mr-3 text-pink-200" />
                <span>+91 9400112833</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Newsletter</h4>
            <p className="text-pink-100 mb-4">
              Subscribe to get updates on new arrivals and special offers.
            </p>
            <button className="bg-pink-800 hover:bg-pink-900 px-4 py-2 rounded-r-lg transition">
              Subscribe
            </button>
          </div>
        </div>

        <div className="border-t border-pink-400 mt-12 pt-6 text-center text-pink-100">
          <p>&copy; {new Date().getFullYear()} Baby Moo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
