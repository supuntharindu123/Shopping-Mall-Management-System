import React from "react";
import Mall from "../../assets/mall.jpg";

const HomeBody = () => {
  return (
    <main className="bg-gray-100">
      <section
        className="bg-cover bg-center text-white text-center py-40"
        style={{ backgroundImage: `url(${Mall})` }}
      >
        <div className="max-w-4xl mx-auto bg-black bg-opacity-50 p-10 rounded-lg">
          <h1 className="text-6xl font-bold">
            Welcome to Mall Management System
          </h1>
          <p className="mt-4 text-xl">
            A complete solution to manage your mall, stores, and services
            efficiently.
          </p>
          <button className="mt-6 bg-yellow-500 text-blue-800 px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-600">
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white text-center">
        <h2 className="text-3xl font-semibold">Our Features</h2>
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
            { title: "Security", desc: "Ensure the safety of mall premises." },
          ].map((feature, index) => (
            <div key={index} className="bg-blue-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-4 text-gray-700">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 bg-blue-50 text-center">
        <h2 className="text-3xl font-semibold">About Us</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Our system provides an efficient way to manage malls, stores, and
          services. We aim to streamline operations and improve the overall
          experience for tenants and customers alike.
        </p>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white text-center">
        <h2 className="text-3xl font-semibold">What Our Users Say</h2>
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
            <div key={index} className="bg-blue-100 p-6 rounded-lg shadow-lg">
              <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
              <p className="mt-4 text-gray-900 font-semibold">
                - {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-16 bg-blue-600 text-white text-center"
      >
        <h2 className="text-3xl font-semibold">Get in Touch</h2>
        <p className="mt-4 text-lg">Have questions? Reach out to us anytime.</p>
        <button className="mt-6 bg-yellow-500 text-blue-800 px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-600">
          Contact Us
        </button>
      </section>
    </main>
  );
};

export default HomeBody;
