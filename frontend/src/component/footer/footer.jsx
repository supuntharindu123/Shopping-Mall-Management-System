import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Us Section */}
        <div className="flex flex-col">
          <h3 className="text-2xl font-semibold mb-4">About Us</h3>
          <p className="text-lg mb-4">
            We are committed to providing efficient mall management solutions
            that streamline the operations of malls, stores, and services.
          </p>
          <a href="#about" className="text-blue-400 hover:text-blue-600">
            Learn More
          </a>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col">
          <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="text-blue-400 hover:text-blue-600">
                Home
              </a>
            </li>
            <li>
              <a href="#stores" className="text-blue-400 hover:text-blue-600">
                Stores
              </a>
            </li>
            <li>
              <a href="#services" className="text-blue-400 hover:text-blue-600">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="text-blue-400 hover:text-blue-600">
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
          <p className="mb-2">
            Email:{" "}
            <a
              href="mailto:support@mallmanagement.com"
              className="text-blue-400 hover:text-blue-600"
            >
              support@mallmanagement.com
            </a>
          </p>
          <p className="mb-2">
            Phone:{" "}
            <a
              href="tel:+1234567890"
              className="text-blue-400 hover:text-blue-600"
            >
              +1 (234) 567-890
            </a>
          </p>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="mt-8 text-center">
        <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
        <div className="flex justify-center space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
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
