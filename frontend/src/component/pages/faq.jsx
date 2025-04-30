import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "What is Crystal Arcade Mall Management System?",
    answer:
      "Crystal Arcade is a digital solution that helps manage mall operations, stores, services, and customer interactions efficiently.",
  },
  {
    question: "How do I register my store in the mall system?",
    answer:
      "You can register by visiting the 'Store Registration' section and filling out the required details. After approval, you will gain access to the management dashboard.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept credit cards, debit cards, and digital wallets for membership and store-related payments.",
  },
  {
    question: "Is customer support available?",
    answer:
      "Yes, our support team is available 24/7 to assist you with any inquiries or issues.",
  },
  {
    question: "Can I customize my store’s page?",
    answer:
      "Yes, store owners can customize their page by adding banners, promotional offers, and product listings from the dashboard.",
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-teal-900">
      <h1 className="text-4xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h1>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-4 rounded-lg shadow-lg cursor-pointer"
          >
            <div
              className="flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              <h2 className="text-xl font-semibold">{faq.question}</h2>
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {openIndex === index && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-700 mt-2"
              >
                {faq.answer}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
