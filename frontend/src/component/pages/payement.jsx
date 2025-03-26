import React, { useState } from "react";

const packages = [
  {
    id: 1,
    name: "Foodie Delight",
    price: 10,
    benefits: [
      "10% off all food and beverage purchases",
      "Free drink or dessert with every $50 spent",
      "Exclusive access to food tastings and chef’s table events",
      "Complimentary meal after 10 visits",
    ],
  },
  {
    id: 2,
    name: "Fashionista",
    price: 15,
    benefits: [
      "15% off all fashion and apparel purchases",
      "Early access to seasonal sales and new collections",
      "Free personal styling session every 3 months",
      "Buy 3, Get 1 Free on selected items",
    ],
  },
  {
    id: 3,
    name: "Entertainment Enthusiast",
    price: 12,
    benefits: [
      "20% off movie tickets and arcade tokens",
      "Free popcorn and drink with every movie ticket purchase",
      "Exclusive access to VIP movie premieres and events",
      "Buy 4 movie tickets, get the 5th one free",
    ],
  },
  {
    id: 4,
    name: "Lifestyle Pro",
    price: 10,
    benefits: [
      "10% off all lifestyle and essential purchases",
      "Free grocery delivery for orders above $50",
      "Discounted wellness packages (e.g., spa treatments, gym memberships)",
      "Buy 1, Get 1 Free on selected wellness products",
    ],
  },
  {
    id: 5,
    name: "Mall Explorer Premium",
    price: 25,
    benefits: [
      "10% off all purchases (food, fashion, entertainment, lifestyle)",
      "Free VIP parking for a month",
      "Exclusive access to all mall events and promotions",
      "Complimentary meal, movie ticket, and spa session every quarter",
    ],
  },
];

const PaymentPage = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    alert(
      `Payment successful! You have subscribed to the ${selectedPackage.name} package.`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-teal-900">
        Membership Payment
      </h1>

      {/* Package Selection Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-teal-900">
          Select a Package
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${
                selectedPackage?.id === pkg.id ? "border-2 border-teal-900" : ""
              }`}
              onClick={() => handlePackageSelect(pkg)}
            >
              <h2 className="text-2xl font-bold mb-4 text-teal-900">
                {pkg.name}
              </h2>
              <p className="text-gray-700 mb-4">${pkg.price}/month</p>
              <ul className="list-disc list-inside mb-4">
                {pkg.benefits.map((benefit, index) => (
                  <li key={index} className="text-gray-600">
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Form Section */}
      {selectedPackage && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-teal-900">
            Payment Details
          </h2>
          <form onSubmit={handlePaymentSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Card Number</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="1234 5678 9012 3456"
                value={paymentDetails.cardNumber}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    cardNumber: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Expiry Date</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="MM/YY"
                value={paymentDetails.expiryDate}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    expiryDate: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">CVV</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="123"
                value={paymentDetails.cvv}
                onChange={(e) =>
                  setPaymentDetails({ ...paymentDetails, cvv: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="bg-teal-900 text-white px-6 py-2 rounded-lg hover:bg-teal-800"
            >
              Pay ${selectedPackage.price}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
