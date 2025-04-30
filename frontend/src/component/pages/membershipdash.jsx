import React from "react";

const rewards = [
  {
    id: 1,
    name: "Free Meal",
    pointsRequired: 200,
    category: "Food",
  },
  {
    id: 2,
    name: "15% Discount Voucher",
    pointsRequired: 300,
    category: "Fashion",
  },
  {
    id: 3,
    name: "Free Movie Ticket",
    pointsRequired: 100,
    category: "Entertainment",
  },
  {
    id: 4,
    name: "Free Spa Session",
    pointsRequired: 150,
    category: "Lifestyle",
  },
];

const suggestions = [
  {
    id: 1,
    title: "Explore Fashion",
    description:
      "You’ve spent $200 on fashion this month. Earn 50 more points to unlock a 15% discount voucher.",
    action: "Shop Now",
  },
  {
    id: 2,
    title: "Try a New Restaurant",
    description:
      "Visit our food court and enjoy a free dessert with your next meal.",
    action: "Dine Now",
  },
  {
    id: 3,
    title: "Watch a Movie",
    description:
      "You’re 50 points away from a free movie ticket. Spend $50 on entertainment to unlock it.",
    action: "Book Now",
  },
];

const Membershipdash = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <h1 className="text-3xl font-bold mb-8 text-teal-900">Your Dashboard</h1>

    {/* Welcome Section */}
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4 text-teal-900">
        Welcome, John Doe
      </h2>
      <p className="text-gray-700">Points: 500</p>
    </div>

    {/* Suggestions Section */}
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4 text-teal-900">
        Suggestions for You
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="border p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2 text-teal-900">
              {suggestion.title}
            </h3>
            <p className="text-gray-700 mb-4">{suggestion.description}</p>
            <button className="bg-teal-900 text-white px-4 py-2 rounded-lg hover:bg-teal-800">
              {suggestion.action}
            </button>
          </div>
        ))}
      </div>
    </div>

    {/* Available Rewards Section */}
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-teal-900">
        Available Rewards
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <div key={reward.id} className="border p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2 text-teal-900">
              {reward.name}
            </h3>
            <p className="text-gray-700 mb-2">
              Points Required: {reward.pointsRequired}
            </p>
            <p className="text-gray-700 mb-2">Category: {reward.category}</p>
            <button className="bg-teal-900 text-white px-4 py-2 rounded-lg hover:bg-teal-800">
              Redeem
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Membershipdash;
