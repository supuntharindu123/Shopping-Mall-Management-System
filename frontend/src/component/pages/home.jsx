import React from "react";
import Mall from "../../assets/Mall05.jpg";
import MallImg from "../../assets/Mall06.jpg";
import MallImgs from "../../assets/Mall07.jpg";
import MallImgss from "../../assets/Mall08.jpg";
import MallImages from "../../assets/Mall09.jpg";
import MallImagess from "../../assets/Mall10.png";

import Back from "../../assets/background.jpg";
import Logo from "../../assets/CA01.jpg";
import { FaUser, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
const images = [Mall, MallImg, MallImgs];
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
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-100%", opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className=" w-full h-screen overflow-hidden flex items-center justify-center"
      >
        <motion.img
          key={index}
          src={images[index]}
          alt="Slideshow"
          className="  w-full h-[100%] object-cover opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
        <div className=" absolute  left-1/2 transform -translate-x-1/2 translate-y-1 bg-teal-700 bg-opacity-50 px-10 py-10 rounded-lg text-center text-white max-w-4xl">
          <div className="flex items-center flex-col">
            <img src={Logo} alt="logo" width={120} />
          </div>
          <h1 className="text-7xl font-bold">Welcome to Crystal Arcade</h1>
          <p className="mt-4 text-xl">
            A complete solution to manage your mall, stores, and services
            efficiently.
          </p>
        </div>
      </motion.div>
      <main className="bg-gray-50">
        {/* Features Section */}
        <section id="categories" className="py-20 bg-gray-300 text-center">
          <h2 className="text-4xl font-extrabold text-teal-900 drop-shadow-md">
            Explore Our Categories
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 px-8">
            {[
              {
                title: "Food",
                description: "Fresh and delicious food items for all tastes.",
                image: `${MallImg}`,
              },
              {
                title: "Entertainment",
                description: "Find a wide range of fun and leisure activities.",
                image: `${MallImgss}`,
              },
              {
                title: "Fashion",
                description:
                  "Explore the latest trends in clothing and accessories.",
                image: `${MallImagess}`,
              },
              {
                title: "Lifestyle",
                description:
                  "Enhance your daily living with quality lifestyle products.",
                image: `${MallImages}`,
              },
            ].map((category, index) => (
              <div
                key={index}
                className="relative bg-white rounded-lg shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out"
              >
                <div
                  className="w-full h-48 bg-cover bg-center rounded-t-lg"
                  style={{
                    backgroundImage: `url(${category.image})`,
                  }}
                ></div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-teal-900 mb-4">
                    {category.title}
                  </h3>
                  <p className="text-lg text-gray-700 mb-4">
                    {category.description}
                  </p>
                  <a
                    href="/shops"
                    className="inline-block text-teal-600 hover:text-teal-800 font-semibold transition duration-300"
                  >
                    Discover More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="about"
          className="py-10 text-center bg-cover bg-center bg-white"
          // style={{ backgroundImage: `url(${Mall})` }}
        >
          <div className="block bg-gray-50 py-10">
            <h2 className="text-3xl font-semibold text-teal-900 drop-shadow-md">
              Become a Member
            </h2>
            <p className="block mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
              Our system provides an efficient way to manage malls, stores, and
              services. We aim to streamline operations and improve the overall
              experience for tenants and customers alike.
            </p>
            <p className="block mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
              As a valued customer, you can purchase a shopping complex
              membership to gain access to our exclusive Purchase Achievement
              Program. Set personalized spending goals, earn exciting rewards,
              and track your progress in real-time. Enjoy exclusive offers,
              priority services, and unlock special benefits as you reach your
              purchase milestones.
            </p>
            <p className="block mt-4 text-lg text-gray-700 max-w-3xl mx-auto mb-8">
              Our AI-powered system tailors personalized targets based on your
              past shopping behavior, ensuring a customized and rewarding
              experience every time you shop.
            </p>
            <a
              href="/payment"
              className="  px-6 py-3 bg-teal-900 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
            >
              Join Now
            </a>
          </div>
        </section>

        <section
          id="about"
          className="py-30 bg-gray-200 text-center"
          style={{
            backgroundImage: `url(${Mall})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className=" py-10 bg-gray-300">
            <h2 className="text-3xl font-bold text-teal-900 drop-shadow-md">
              About Us
            </h2>
            <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
              Our Mall Management System is designed to revolutionize the way
              malls, stores, and services are managed. With an intuitive
              interface and powerful features, we streamline operations, improve
              efficiency, and enhance the experience for both tenants and
              customers.
            </p>
            <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
              We offer a comprehensive solution that includes store management,
              real-time customer support, detailed analytics, and security
              features, all aimed at creating a seamless shopping experience.
              Whether you're a mall manager, store owner, or customer, our
              system is tailored to meet your unique needs and help you achieve
              your goals with ease.
            </p>
            <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
              Join us and experience how our AI-powered platform can transform
              your mall management. We bring modern technology and innovation to
              your fingertips, ensuring both business owners and shoppers enjoy
              an optimized environment.
            </p>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-16 bg-white text-center relative"
        >
          <h2 className="text-3xl font-semibold text-teal-900 mb-8 drop-shadow-md">
            What Our Users Say
          </h2>

          {/* Background overlay */}
          <div className="absolute inset-0 bg-gray-500   opacity-30 z-0"></div>

          <div className="relative z-10 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6">
            {[
              {
                name: "John Doe",
                title: "Mall Manager",
                feedback:
                  "This system has completely transformed the way we manage our mall operations. It's efficient, user-friendly, and has improved both tenant and customer satisfaction.",
                image: "/path/to/john-image.jpg",
                rating: 5,
              },
              {
                name: "Jane Smith",
                title: "Store Owner",
                feedback:
                  "The user interface is simple and intuitive. It has helped me monitor store activities and engage with customers more effectively. Highly recommended for all retail businesses.",
                image: "/path/to/jane-image.jpg",
                rating: 4,
              },
              {
                name: "Sam Wilson",
                title: "Customer Support Lead",
                feedback:
                  "A game changer for both tenants and customers. The support system is seamless, and the real-time updates keep everyone in the loop. We’ve seen significant improvements in communication.",
                image: "/path/to/sam-image.jpg",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out relative"
              >
                {/* Testimonial Header: Image and Info */}
                <div className="flex items-center space-x-4">
                  {/* <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover shadow-lg"
                  /> */}
                  <div className="text-left">
                    <p className="text-teal-900 font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-600 text-sm">{testimonial.title}</p>
                  </div>
                </div>

                {/* Testimonial Rating */}
                <div className="mt-4 flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 15.27l4.15 2.18-1.1-4.73 3.67-3.02-4.85-.42L10 0 7.03 9.28l-4.85.42 3.67 3.02-1.1 4.73L10 15.27z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Feedback */}
                <p className="mt-4 text-gray-700 italic">
                  "{testimonial.feedback}"
                </p>

                {/* Testimonial Footer: Job Title and Name */}
                <p className="mt-4 text-teal-900 font-semibold">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
      </main>
    </>
  );
};

export default HomePage;
