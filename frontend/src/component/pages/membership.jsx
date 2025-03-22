import { useState } from "react";
import {
  FaCheckCircle,
  FaCreditCard,
  FaStar,
  FaGift,
  FaShoppingCart,
  FaUtensils,
  FaUsers,
} from "react-icons/fa";

export default function MembershipPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const membershipPlans = [
    {
      id: 1,
      name: "Basic",
      price: "$9.99/month",
      benefits: [
        "Earn Reward Points",
        "Exclusive Deals",
        "Monthly Discount Coupons",
        "Priority Customer Support",
      ],
    },
    {
      id: 2,
      name: "Premium",
      price: "$19.99/month",
      benefits: [
        "VIP Parking",
        "Higher Cashback",
        "Early Access to Sales",
        "Exclusive Food Court Discounts",
      ],
    },
    {
      id: 3,
      name: "Elite",
      price: "$29.99/month",
      benefits: [
        "Free Entertainment",
        "Personalized Offers",
        "Access to VIP Lounge",
        "Personal Shopping Assistance",
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-teal-900 mb-2">
          Membership & Rewards
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Choose a membership plan and start earning rewards for your purchases.
          Enjoy exclusive benefits, discounts, and personalized offers tailored
          just for you.
        </p>
      </div>

      {/* Membership Plans */}
      <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl">
        {membershipPlans.map((plan) => (
          <div
            key={plan.id}
            className={`p-6 text-center cursor-pointer border-2 rounded-lg shadow-lg bg-white transition-all duration-300 ${
              selectedPlan === plan.id
                ? "border-pink-400 transform scale-105"
                : "border-gray-200 hover:shadow-xl"
            }`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <h2 className="text-2xl font-semibold text-teal-900 mb-2">
              {plan.name}
            </h2>
            <p className="text-gray-500 text-lg mb-4">{plan.price}</p>
            <ul className="mt-4 space-y-3">
              {plan.benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-center justify-start gap-3 text-sm text-gray-700"
                >
                  <FaCheckCircle className="text-teal-900" size={18} />{" "}
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Purchase Button */}
      <button
        className={`mt-8 px-8 py-3 bg-teal-900 text-white rounded-lg hover:bg-teal-700 flex items-center transition duration-300 ${
          !selectedPlan ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!selectedPlan}
      >
        <FaCreditCard className="mr-2" size={20} /> Purchase Membership
      </button>

      {/* Membership Benefits Section */}
      <div className="mt-12 w-full max-w-6xl p-8 bg-white shadow-lg rounded-xl">
        <h3 className="text-2xl font-semibold mb-6 text-teal-900">
          Membership Benefits
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <FaStar size={28} />, text: "VIP Access" },
            { icon: <FaGift size={28} />, text: "Exclusive Rewards" },
            { icon: <FaCreditCard size={28} />, text: "Cashback Offers" },
            { icon: <FaCheckCircle size={28} />, text: "Personalized Deals" },
            { icon: <FaShoppingCart size={28} />, text: "Shopping Discounts" },
            { icon: <FaUtensils size={28} />, text: "Food Court Discounts" },
            { icon: <FaUsers size={28} />, text: "VIP Lounge Access" },
          ].map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-teal-900">{benefit.icon}</div>
              <p className="text-gray-700 text-center">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-12 w-full max-w-6xl p-8 bg-white shadow-lg rounded-xl">
        <h3 className="text-2xl font-semibold mb-6 text-teal-900">
          What Our Members Say
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: "John Doe",
              feedback:
                "The Elite membership has completely transformed my shopping experience. Highly recommended!",
            },
            {
              name: "Jane Smith",
              feedback:
                "I love the exclusive discounts and personalized offers. It's worth every penny!",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
              <p className="mt-4 text-teal-900 font-semibold">
                - {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
