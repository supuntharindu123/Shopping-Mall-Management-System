import React from "react";
import Mall from "../../assets/mall.jpg";
import Back from "../../assets/background.jpg";
import { FaUser, FaShoppingCart, FaChevronDown } from "react-icons/fa";

const HomePage = () => {
  return (
    <>
      <main className="bg-gray-50">
        <section
          className="bg-cover bg-center text-white text-center py-40"
          style={{ backgroundImage: `url(${Back})` }}
        >
          <div className="max-w-4xl mx-auto bg-gray-500 bg-opacity-100 px-10 rounded-lg py-25 text-center justify-center">
            <FaShoppingCart size={24} />
            <h1 className="text-7xl font-bold">
              Welcome to Mall Management System
            </h1>
            <p className="mt-4 text-xl">
              A complete solution to manage your mall, stores, and services
              efficiently.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-30 bg-white text-center"
          style={{ backgroundImage: `url(${Mall})` }}
        >
          <h2 className="text-3xl font-semibold text-teal-900">Our Features</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6">
            {[
              {
                title: "Store Management",
                desc: "Track and manage all stores easily.",
              },
              {
                title: "Services",
                desc: "Offer a range of services to customers.",
              },
              {
                title: "Customer Support",
                desc: "Assist mall visitors in real-time.",
              },
              {
                title: "Analytics",
                desc: "Gain insights into mall performance.",
              },
              {
                title: "Security",
                desc: "Ensure the safety of mall premises.",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-teal-900">
                  {feature.title}
                </h3>
                <p className="mt-4 text-gray-700">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="about"
          className="py-30 bg-gray-50 text-center"
          style={{ backgroundImage: `url(${Back})` }}
        >
          <h2 className="text-3xl font-semibold text-teal-900">
            {" "}
            Become a Member
          </h2>
          <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
            Our system provides an efficient way to manage malls, stores, and
            services. We aim to streamline operations and improve the overall
            experience for tenants and customers alike.
          </p>
        </section>
        <section
          id="about"
          className="py-30 bg-gray-50 text-center"
          style={{ backgroundImage: `url(${Back})` }}
        >
          <h2 className="text-3xl font-semibold text-teal-900">About Us</h2>
          <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
            Our system provides an efficient way to manage malls, stores, and
            services. We aim to streamline operations and improve the overall
            experience for tenants and customers alike.
          </p>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 bg-white text-center">
          <h2 className="text-3xl font-semibold text-teal-900">
            What Our Users Say
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6">
            {[
              {
                name: "John Doe",
                feedback: "This system has transformed our mall management!",
              },
              {
                name: "Jane Smith",
                feedback:
                  "Easy to use and extremely efficient. Highly recommended!",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-lg">
                <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
                <p className="mt-4 text-teal-900 font-semibold">
                  - {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-16 bg-teal-900 text-white text-center"
        >
          <h2 className="text-3xl font-semibold">Get in Touch</h2>
          <p className="mt-4 text-lg">
            Have questions? Reach out to us anytime.
          </p>
          <button className="mt-6 bg-gray-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-500">
            Contact Us
          </button>
        </section>
        <section className="py-16 bg-teal-900 text-white text-center">
          <h2 className="text-3xl font-semibold">Ready to Get Started?</h2>
          <p className="mt-4 text-lg">
            Join thousands of satisfied customers and transform your mall
            operations today.
          </p>
          <button className="mt-6 bg-gray-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-500">
            Sign Up Now
          </button>
        </section>
      </main>
    </>
  );
};

export default HomePage;
