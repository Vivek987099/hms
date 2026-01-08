import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

function Footer() {
  return (
    <>
    <footer className="bg-teal-700 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* --- Left Section --- */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">RM Health Care</h2>
          <p className="text-sm leading-relaxed">
            Providing comprehensive cancer care with compassion and commitment.
            Your health is our priority.
          </p>

          <div className="flex space-x-4 mt-5">
            <a href="#" className="hover:text-teal-300"><FaFacebookF /></a>
            <a href="#" className="hover:text-teal-300"><FaTwitter /></a>
            <a href="#" className="hover:text-teal-300"><FaInstagram /></a>
            <a href="#" className="hover:text-teal-300"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* --- Middle Section --- */}
        <div>
          <h3 className="text-xl font-semibold mb-3 border-b border-teal-500 inline-block pb-1">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-teal-300">Home</a></li>
            <li><a href="/about" className="hover:text-teal-300">About</a></li>
            <li><a href="/services" className="hover:text-teal-300">Services</a></li>
            <li><a href="/contact" className="hover:text-teal-300">Contact</a></li>
          </ul>
        </div>

        {/* --- Right Section --- */}
        <div>
          <h3 className="text-xl font-semibold mb-3 border-b border-teal-500 inline-block pb-1">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center">
              <MdLocationOn className="mr-2 text-teal-300" /> 123 Health Street, City, State
            </li>
            <li className="flex items-center">
              <FaPhoneAlt className="mr-2 text-teal-300" /> +91 98765 43210
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2 text-teal-300" /> info@rmhealthcare.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-teal-600 mt-8 pt-4 text-center text-sm">
        © {new Date().getFullYear()} RM Health Care. All rights reserved.
      </div>

    </footer>
    </>
  )
}

export default Footer
