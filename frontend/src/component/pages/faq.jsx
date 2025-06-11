import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaSearch } from "react-icons/fa";

const faqs = [
  {
    question: "What is Crystal Arcade Mall Management System?",
    answer:
      "Crystal Arcade is a digital solution that helps manage mall operations, stores, services, and customer interactions efficiently.",
  },
  {
    question: "What membership packages do you offer?",
    answer:
      "We offer various membership packages including Foodie Delight for food enthusiasts (10% off at food outlets), Fashionista for shopping lovers (15% off at fashion stores), and Premium packages for all-round benefits.",
  },
  {
    question: "How do membership points work?",
    answer:
      "Members earn points based on their package type and spending. Foodie Delight members earn 1 point per dollar at food outlets, Fashionista members earn 2 points per dollar at fashion stores, and points can be redeemed for rewards.",
  },
  {
    question: "Can I upgrade my membership package?",
    answer:
      "Yes, you can upgrade your membership package at any time. The new benefits will take effect immediately upon successful upgrade.",
  },
  {
    question: "How long are membership packages valid?",
    answer:
      "All membership packages are valid for 30 days from the date of purchase. You can renew your membership before or after expiration.",
  },
  {
    question: "What happens to my points when my membership expires?",
    answer:
      "Your earned points remain valid for 6 months, even if your membership expires. We recommend renewing your membership to continue enjoying benefits.",
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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-teal-900">
          How can we help you?
        </h1>

        {/* Search Section */}
        <div className="mb-8">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {faq.question}
                  </h2>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaChevronDown className="text-teal-900" />
                  </motion.div>
                </div>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === index ? "auto" : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="mt-4 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
