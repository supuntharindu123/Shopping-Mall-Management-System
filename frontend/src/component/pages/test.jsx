import React from "react";

const CustomerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Greeting */}
        <h1 className="text-gray-800 text-3xl font-bold mb-6">
          Welcome Back, John!
        </h1>

        {/* Spending Goals */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-gray-800 text-xl font-bold mb-4">
            Spending Goals
          </h2>
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-pink-400 rounded"
              style={{ width: "60%" }}
            ></div>
          </div>
          <p className="text-gray-800 mt-2">$200 / $500</p>
        </div>

        {/* Rewards Summary */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-gray-800 text-xl font-bold mb-4">
            Rewards Summary
          </h2>
          <p className="text-gray-800">You have 1,200 points.</p>
          <button className="mt-4 bg-pink-400 text-white py-2 px-4 rounded hover:bg-pink-500">
            Redeem Now
          </button>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-800 text-xl font-bold mb-4">
              Achievements
            </h2>
            <p className="text-gray-800">Unlock badges and rewards.</p>
            <button className="mt-4 bg-pink-400 text-white py-2 px-4 rounded hover:bg-pink-500">
              View Achievements
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-800 text-xl font-bold mb-4">Offers</h2>
            <p className="text-gray-800">Exclusive deals for you.</p>
            <button className="mt-4 bg-pink-400 text-white py-2 px-4 rounded hover:bg-pink-500">
              View Offers
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-800 text-xl font-bold mb-4">Events</h2>
            <p className="text-gray-800">VIP access to special events.</p>
            <button className="mt-4 bg-pink-400 text-white py-2 px-4 rounded hover:bg-pink-500">
              View Events
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-800 text-xl font-bold mb-4">
            Notifications
          </h2>
          <div className="space-y-2">
            <div className="p-4 border border-gray-200 rounded">
              <p className="text-gray-800">
                You’re $50 away from your next reward!
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded">
              <p className="text-gray-800">
                New offer: 20% off at the food court.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
