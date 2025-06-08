import React, { useState } from "react";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState("");

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Please enter a valid email address";
    if (!formData.message) errors.message = "Message is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      // Simulate form submission and response
      setTimeout(() => {
        setLoading(false);
        setSubmissionStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setFormErrors({});
      }, 2000);
    } else {
      setSubmissionStatus("error");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-teal-900 p-6">
          <h1 className="text-3xl font-bold text-white">Contact Us</h1>
          <p className="mt-2 text-gray-400">
            We're here to help! Reach out to us for any inquiries or support.
          </p>
        </div>

        {/* Form Section */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-teal-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  aria-required="true"
                  value={formData.name}
                  onChange={handleChange}
                  className={` py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-900 focus:ring-teal-900 sm:text-sm ${
                    formErrors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Your Name"
                  aria-label="Your Name"
                />
                {formErrors.name && (
                  <p className="text-red-500 text-lg mt-1">{formErrors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-teal-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  aria-required="true"
                  value={formData.email}
                  onChange={handleChange}
                  className={`py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-900 focus:ring-teal-900 sm:text-sm ${
                    formErrors.email ? "border-red-500" : ""
                  }`}
                  placeholder="your.email@example.com"
                  aria-label="Your Email"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-lg mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Message Field */}
            <div className="mt-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-teal-900"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                aria-required="true"
                value={formData.message}
                onChange={handleChange}
                className={`py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-900 focus:ring-teal-900 sm:text-sm ${
                  formErrors.message ? "border-red-500" : ""
                }`}
                placeholder="Your message..."
                aria-label="Your Message"
              ></textarea>
              {formErrors.message && (
                <p className="text-red-500 text-lg   mt-1">
                  {formErrors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-900 text-white py-2 px-4 rounded-md hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-900 focus:ring-offset-2"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>

            {/* Submission Status */}
            {submissionStatus === "success" && (
              <div className="mt-6 text-green-600 text-center">
                <p>Message sent successfully!</p>
              </div>
            )}
            {submissionStatus === "error" && (
              <div className="mt-6 text-red-600 text-center">
                <p>
                  There was an error submitting your message. Please try again.
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Contact Information Section */}
        <div className="bg-gray-50 p-6">
          <h2 className="text-xl font-semibold text-teal-900">
            Our Contact Information
          </h2>
          <div className="mt-4 space-y-2 text-gray-700">
            <p>Email: support@mallmanagement.com</p>
            <p>Phone: +1 (123) 456-7890</p>
            <p>Address: 123 Mall Street, City, Country</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
