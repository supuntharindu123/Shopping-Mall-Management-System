import React, { useState } from "react";
import { Link } from "react-router-dom";
import back from '../../assets/backyardparking.jpg';
import basement from'../../assets/basement-parking.jpg';
import floor from '../../assets/1stfloor.jpg';

function ParkingHome() {
  // Mock parking availability
  const parkingOptions = [
    {
      name: "Basement Parking",
      image: basement,
      link: "/parking/basement",
      availability: "✅ 5 spots left",
      price: "$2/hr",
      security: "High Security"
    },
    {
      name: "1st Floor Parking",
      image: floor,
      link: "/parking/first-floor",
      availability: "⚠️ Only 2 spots left",
      price: "$1.5/hr",
      security: "Medium Security"
    },
    {
      name: "Backyard Parking",
      image: back,
      link: "/parking/backyard",
      availability: "❌ Full",
      price: "Free for 1 hour",
      security: "Low Security"
    }
  ];

  const [selectedDuration, setSelectedDuration] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-teal-900 text-3xl font-bold text-center mb-4">
        Choose Your Parking Space
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Find the best parking space based on availability, security, and pricing.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {parkingOptions.map((parking, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <img src={parking.image} alt={parking.name} className="rounded-lg mb-4" />
            <h3 className="text-teal-900 text-xl font-semibold">{parking.name}</h3>
            <p className="text-gray-500 text-sm">{parking.availability}</p>
            <p className="text-gray-700 font-medium">Price: {parking.price}</p>
            <p className="text-gray-700 font-medium">Security: {parking.security}</p>
            <select
              className="mt-2 p-2 border rounded-lg"
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
            >
              <option value="1">1 Hour</option>
              <option value="2">2 Hours</option>
              <option value="3">3 Hours</option>
            </select>
            <a href="/Addparking" className="block mt-4 bg-teal-900 text-white py-2 px-4 rounded-lg hover:bg-gray-400">
              Select {parking.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParkingHome;
