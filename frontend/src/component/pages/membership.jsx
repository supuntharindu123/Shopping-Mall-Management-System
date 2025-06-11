import React, { useState } from "react";
import { motion } from "framer-motion";

const packages = [
  {
    name: "Foodie Delight",
    price: 10,
    benefits: [
      "10% off all food and beverage purchases",
      "Free drink or dessert with every $50 spent",
      "Exclusive access to food tastings and chef’s table events",
      "Complimentary meal after 10 visits",
    ],
    rewards:
      "Earn 1 point for every $1 spent on food and beverages. Redeem points for free meals, discounts, or VIP dining experiences.",
    example:
      "A customer who spends $200/month on food can save $20 and earn 200 points, redeemable for a free meal.",
  },
  {
    name: "Fashionista",
    price: 15,
    benefits: [
      "15% off all fashion and apparel purchases",
      "Early access to seasonal sales and new collections",
      "Free personal styling session every 3 months",
      "Buy 3, Get 1 Free on selected items",
    ],
    rewards:
      "Earn 2 points for every $1 spent on fashion and apparel. Redeem points for discounts, free items, or VIP shopping events.",
    example:
      "A customer who spends $300/month on fashion can save $45 and earn 600 points, redeemable for a $30 discount.",
  },
  {
    name: "Entertainment Enthusiast",
    price: 12,
    benefits: [
      "20% off movie tickets and arcade tokens",
      "Free popcorn and drink with every movie ticket purchase",
      "Exclusive access to VIP movie premieres and events",
      "Buy 4 movie tickets, get the 5th one free",
    ],
    rewards:
      "Earn 1 point for every $1 spent on entertainment. Redeem points for free movie tickets, arcade tokens, or event passes.",
    example:
      "A customer who spends $100/month on entertainment can save $20 and earn 100 points, redeemable for a free movie ticket.",
  },
  {
    name: "Lifestyle Pro",
    price: 10,
    benefits: [
      "10% off all lifestyle and essential purchases",
      "Free grocery delivery for orders above $50",
      "Discounted wellness packages (e.g., spa treatments, gym memberships)",
      "Buy 1, Get 1 Free on selected wellness products",
    ],
    rewards:
      "Earn 1 point for every $1 spent on lifestyle and essentials. Redeem points for discounts, free products, or wellness services.",
    example:
      "A customer who spends $150/month on groceries and wellness can save $15 and earn 150 points, redeemable for a free spa session.",
  },
  {
    name: "Mall Explorer Premium",
    price: 25,
    benefits: [
      "10% off all purchases (food, fashion, entertainment, lifestyle)",
      "Free VIP parking for a month",
      "Exclusive access to all mall events and promotions",
      "Complimentary meal, movie ticket, and spa session every quarter",
    ],
    rewards:
      "Earn 2 points for every $1 spent across all categories. Redeem points for mall-wide discounts, VIP experiences, or gift cards.",
    example:
      "A customer who spends $500/month across all categories can save $50 and earn 1,000 points, redeemable for a $50 mall voucher.",
  },
];

const PackageCard = ({ membershipPackage, isSelected, onSelect }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`relative p-6 rounded-xl shadow-lg border-2 transition-all duration-300 cursor-pointer ${
      isSelected ? "border-teal-900 bg-gray-50" : "border-gray-400 bg-gray-50"
    }`}
    onClick={() => onSelect(membershipPackage.name)}
    role="button"
    aria-label={`Select ${membershipPackage.name} package`}
    tabIndex={0}
  >
    {isSelected && (
      <motion.div
        className="absolute top-2 right-2 bg-teal-900 text-white px-3 py-1 rounded-full text-xs font-bold"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        Selected
      </motion.div>
    )}
    <h2 className="text-2xl font-bold mb-4 text-teal-900">
      {membershipPackage.name}
    </h2>
    <p className="text-gray-700 mb-4">
      <strong className="text-lg">${membershipPackage.price}</strong>/month
    </p>
    <ul className="list-disc list-inside mb-4 text-gray-700">
      {membershipPackage.benefits.map((benefit, index) => (
        <li key={index}>{benefit}</li>
      ))}
    </ul>
    <p className="text-gray-700 mb-4">
      <strong>Rewards:</strong> {membershipPackage.rewards}
    </p>
    <p className="text-gray-700 mb-4">
      <strong>Example:</strong> {membershipPackage.example}
    </p>
    <button
      className="w-full bg-teal-900 text-white px-6 py-2 rounded-lg hover:bg-teal-800 transition-all"
      onClick={() => onSelect(membershipPackage.name)}
    >
      Select Package
    </button>
  </motion.div>
);

const PackageSelection = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-teal-900">
        Choose Your Membership Package
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg, index) => (
          <PackageCard
            key={index}
            membershipPackage={pkg}
            isSelected={selectedPackage === pkg.name}
            onSelect={setSelectedPackage}
          />
        ))}
      </div>
      {selectedPackage && (
        <div className="mt-8 text-center text-lg text-teal-900">
          ✅ <strong>{selectedPackage}</strong> selected! You can now proceed
          with your membership.
        </div>
      )}
    </div>
  );
};

export default PackageSelection;
