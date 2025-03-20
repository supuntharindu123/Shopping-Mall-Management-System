import React from "react";
import { FaUser, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-blue-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold flex items-center space-x-2">
          <FaShoppingCart size={24} />
          <span>Mall Management</span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <ul className="hidden md:flex space-x-6">
            <li>
              <a href="#home" className="text-white hover:text-blue-300">
                Home
              </a>
            </li>
            <li>
              <a href="#stores" className="text-white hover:text-blue-300">
                Stores
              </a>
            </li>
            <li>
              <a href="#services" className="text-white hover:text-blue-300">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="text-white hover:text-blue-300">
                Contact
              </a>
            </li>
          </ul>

          {/* Login Button with User Icon */}
          <a
            href="/login"
            className="flex items-center space-x-2 bg-yellow-500 text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold transition hover:bg-yellow-600"
          >
            <FaUser size={18} />
            <span>Login</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
