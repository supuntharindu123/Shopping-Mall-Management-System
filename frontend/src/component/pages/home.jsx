import React from "react";
import Mall_A  from "../../assets/Mall01.jpg";
import Mall_B  from "../../assets/Mall02.jpg";
import Mall_C  from "../../assets/Mall03.jpg";
import Mall_D  from "../../assets/Mall04.jpg";
import Mall_E  from "../../assets/Mall05.jpg";
import Mall_F  from "../../assets/Mall06.jpg";
import Mall_G  from "../../assets/Mall07.jpg";
import Mall_H  from "../../assets/Mall08.jpg";
import Mall_I  from "../../assets/Mall09.jpg";
import Mall_J  from "../../assets/Mall10.png";

import Back from "../../assets/background.jpg";
import Logo from "../../assets/CA01.jpg";
import { FaUser, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";


const images = [Mall_E, Mall_I, Mall_J,Mall_G,Mall_F];
const HomePage = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {/* Hero Section */}
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-100%", opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black"
      >
        <motion.img
          key={index}
          src={images[index]}
          alt="Slideshow"
          className="w-full h-full object-cover opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 bg-black/50 backdrop-blur-sm px-12 py-10 rounded-xl text-center text-white max-w-4xl">
          <div className="flex items-center flex-col">
            <img src={Logo} alt="logo" width={140} className="mb-6 rounded-full shadow-xl" />
          </div>
          <h1 className="text-7xl font-bold text-white mb-4 drop-shadow-lg">Welcome to Crystal Arcade</h1>
          <p className="mt-4 text-xl text-gray-100">
            A complete solution to manage your mall, stores, and services efficiently.
          </p>
        </div>
      </motion.div>

      <main className="bg-gray-50">
        {/* Categories Section - Enhanced styling */}
        <section id="categories" className="relative py-24">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
            style={{ backgroundImage: `url(${Mall_D})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-5xl font-bold text-white mb-6">
                  Explore Our Categories
                  <div className="w-32 h-1.5 bg-teal-400 mx-auto mt-6 rounded-full"></div>
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Discover everything you need under one roof
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    title: "Food",
                    description: "Fresh and delicious food items for all tastes.",
                    icon: "🍽️"
                  },
                  {
                    title: "Entertainment",
                    description: "Find a wide range of fun and leisure activities.",
                    icon: "🎮"
                  },
                  {
                    title: "Fashion",
                    description: "Explore the latest trends in clothing and accessories.",
                    icon: "👗"
                  },
                  {
                    title: "Lifestyle",
                    description: "Enhance your daily living with quality lifestyle products.",
                    icon: "✨"
                  },
                ].map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8 
                              border border-white/20 hover:border-teal-500/30 
                              group hover:transform hover:-translate-y-2 
                              transition-all duration-300"
                  >
                    <div className="flex items-center justify-center mb-8">
                      <div className="w-20 h-20 bg-teal-400/20 rounded-full flex items-center justify-center
                                    group-hover:bg-teal-400/30 transition-colors duration-300">
                        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                          {category.icon}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white text-center mb-4">
                      {category.title}
                    </h3>
                    <p className="text-gray-300 text-center mb-8">
                      {category.description}
                    </p>
                    <div className="text-center">
                      <a
                        href="/shops"
                        className="inline-flex items-center px-6 py-3 rounded-lg
                                 bg-teal-400/20 text-teal-300 font-semibold 
                                 hover:bg-teal-400/30 transition-all duration-200
                                 group-hover:transform group-hover:translate-x-1"
                      >
                        Discover More
                        <svg 
                          className="w-5 h-5 ml-2" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Membership Section - Updated with new styling */}
        <section id="membership" className="relative py-24 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
            style={{ backgroundImage: `url(${Mall_I})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/90"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Become a Member
                  <div className="w-24 h-1 bg-teal-400 mx-auto mt-4"></div>
                </h2>
                <p className="text-xl text-gray-300">
                  Join our exclusive membership program and unlock premium benefits
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-teal-400/20 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-100 text-lg">
                      Access to exclusive Purchase Achievement Program with personalized spending goals
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-teal-400/20 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                      </svg>
                    </div>
                    <p className="text-gray-100 text-lg">
                      AI-powered personalized shopping recommendations and rewards
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-teal-400/20 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-100 text-lg">
                      Priority services and real-time progress tracking
                    </p>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <a
                    href="/membershippage"
                    className="inline-block px-8 py-4 bg-white text-teal-900 font-bold text-lg rounded-lg shadow-xl hover:bg-gray-100 transform hover:scale-105 transition duration-300"
                  >
                    Join Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section - Updated with background image */}
        <section id="about" className="relative py-32">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
            style={{ backgroundImage: `url(${Mall_H})` }}
          >
            <div className="absolute inset-0 bg-black/70"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-white text-center mb-12">
                About Us
                <div className="w-24 h-1 bg-teal-400 mx-auto mt-4"></div>
              </h2>
              <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8 space-y-6 border border-white/20">
                <p className="text-lg text-gray-100 leading-relaxed">
                  Our Mall Management System is designed to revolutionize the way
                  malls, stores, and services are managed. With an intuitive
                  interface and powerful features, we streamline operations, improve
                  efficiency, and enhance the experience for both tenants and
                  customers.
                </p>
                <p className="text-lg text-gray-100 leading-relaxed">
                  We offer a comprehensive solution that includes store management,
                  real-time customer support, detailed analytics, and security
                  features, all aimed at creating a seamless shopping experience.
                  Whether you're a mall manager, store owner, or customer, our
                  system is tailored to meet your unique needs and help you achieve
                  your goals with ease.
                </p>
                <p className="text-lg text-gray-100 leading-relaxed">
                  Join us. We bring modern technology and innovation to
                  your fingertips, ensuring both business owners and shoppers enjoy
                  an optimized environment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section - Updated with background image */}
        <section className="relative py-32">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
            style={{ backgroundImage: `url(${Mall_J})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/90"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white">
                What Our Users Say
                <div className="w-24 h-1 bg-teal-400 mx-auto mt-4"></div>
              </h2>
              <p className="mt-6 text-xl text-gray-300">
                Trusted by mall managers, store owners, and customers
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {[
                {
                  name: "John Doe",
                  role: "Mall Manager",
                  image: "/testimonials/john.jpg",
                  feedback:
                    "This system has completely transformed the way we manage our mall operations. It's efficient, user-friendly, and has improved both tenant and customer satisfaction.",
                  rating: 5,
                },
                {
                  name: "Jane Smith",
                  role: "Store Owner",
                  image: "/testimonials/jane.jpg",
                  feedback:
                    "The user interface is simple and intuitive. It has helped me monitor store activities and engage with customers more effectively.",
                  rating: 4,
                },
                {
                  name: "Sam Wilson",
                  role: "Customer Support Lead",
                  image: "/testimonials/sam.jpg",
                  feedback:
                    "A game changer for both tenants and customers. The support system is seamless, and the real-time updates keep everyone in the loop.",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="relative bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6 
                             hover:shadow-teal-500/20 transition duration-300 border border-white/20"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-teal-400/20 flex items-center justify-center">
                      <span className="text-teal-300 text-xl font-bold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-300">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? "text-teal-400"
                            : "text-gray-600"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-gray-300 italic mb-4">"{testimonial.feedback}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>


      </main>
    </>
  );
};

export default HomePage;
