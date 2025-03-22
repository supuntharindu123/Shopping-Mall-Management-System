import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-teal-950 text-white py-12">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Us Section */}
        <div className="flex flex-col">
          <h3 className="text-2xl font-semibold mb-4">About Us</h3>
          <p className="text-lg mb-4">
            We are committed to providing efficient mall management solutions
            that streamline the operations of malls, stores, and services.
          </p>
          <a
            href="#about"
            className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
          >
            Learn More
          </a>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col">
          <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#home"
                className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#stores"
                className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
              >
                Stores
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information Section */}
        <div className="flex flex-col">
          <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
          <p className="text-lg mb-4">
            For inquiries, support, or feedback, feel free to reach out to us.
          </p>
          <div className="space-y-2">
            <div className="flex items-center">
              <FaEnvelope className="text-gray-400 mr-2" />
              <a
                href="mailto:support@mallmanagement.com"
                className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
              >
                support@mallmanagement.com
              </a>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-gray-400 mr-2" />
              <a
                href="tel:+1234567890"
                className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
              >
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription Section */}
        <div className="flex flex-col">
          <h3 className="text-2xl font-semibold mb-4">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-lg mb-4">
            Stay updated with the latest news and offers.
          </p>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button
              type="submit"
              className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
        <div className="flex justify-center space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
          >
            <FaLinkedinIn size={24} />
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-12 text-center text-sm">
        <p>&copy; 2025 Mall Management System. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
