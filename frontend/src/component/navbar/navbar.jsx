import React, { useState } from "react";
import { FaUser, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import Logo from "../../assets/CA01.jpg";

function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleServicesDropdown = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  return (
    <nav className=" bg-teal-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold flex items-center space-x-2">
          <div className="flex items-center flex-col">
            <img src={Logo} alt="logo" width={60} />

            {/* CA &nbsp;
          <FaShoppingCart size={24} /> */}
            <span className=" font-extrabold text-xl">Crystal Arcade </span>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <ul className="hidden md:flex space-x-6">
            <li>
              <a
                href="/"
                className="text-white hover:text-gray-400 font-bold text-2xl"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#stores"
                className="text-white hover:text-gray-400 font-bold text-2xl"
              >
                Stores
              </a>
            </li>
            <li className="relative">
              <button
                onClick={toggleServicesDropdown}
                className="text-white hover:text-gray-400 flex items-center focus:outline-none"
              >
                <span className="font-bold text-2xl">Services</span>
                <FaChevronDown size={14} className="ml-1" />
              </button>
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-5 w-48 bg-white shadow-lg">
                  <ul className="">
                    <li>
                      <a
                        href="/parkingHome"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
                      >
                        Parking Services
                      </a>
                    </li>
                    <li>
                      <a
                        href="/Faq"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
                      >
                        Help
                      </a>
                    </li>
                    <li>
                      <a
                        href="/security"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
                      >
                        Security
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <a
                href="/contact"
                className="text-white hover:text-gray-500 hover:scale-105 font-bold text-2xl"
              >
                Contact
              </a>
            </li>
          </ul>

          <a
            href="/login"
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition hover:bg-gray-500"
          >
            <FaUser size={18} />
            <span className="text-xl">Login</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
