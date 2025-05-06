import React, { useState, useEffect } from "react";
import { FaCar, FaMotorcycle } from "react-icons/fa";

function AvailableSpots() {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAvailableSpots();
  }, []);

  const fetchAvailableSpots = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/available-spots");
      const data = await response.json();
      setSpots(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching spots:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-teal-900 text-4xl font-bold text-center mb-8">
        Parking Management Dashboard
      </h1>

      <div className="flex justify-center items-center mb-6">
        <nav className="space-x-4 bg-teal-900  py-3 mr-10">
          <a
            href="/parkingdashboard"
            className="text-white font-bold hover:bg-gray-800 transition duration-300 py-3 px-6"
          >
            Dashboard
          </a>
          <a
            href="/parkingadd"
            className="text-white font-bold hover:bg-gray-800 transition duration-300 py-3 px-6"
          >
            Add Parking
          </a>
          <a
            href="/parkingcategory"
            className="text-white font-bold hover:bg-gray-800 transition duration-300 py-3 px-6"
          >
            Add Categories
          </a>
          <a
            href="/availableparkingspots"
            className="text-white font-bold hover:bg-gray-800 transition duration-300 py-3 px-6"
          >
            Available Spots
          </a>
          <a
            href="/reserveparkingspots"
            className="text-white font-bold hover:bg-gray-800 transition duration-300 py-3 px-6"
          >
            Reserve Spots
          </a>
        </nav>
      </div>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-teal-900 mb-6">
          Available Parking Spots
        </h1>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {spots.map((spot) => (
              <div key={spot._id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">{spot.category}</h3>
                  {spot.vehicleType === "Car" ? (
                    <FaCar size={24} />
                  ) : (
                    <FaMotorcycle size={24} />
                  )}
                </div>
                <p className="text-green-600 font-bold">
                  {spot.available} spots available
                </p>
                <p className="text-gray-600">Rate: ${spot.rate}/hour</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AvailableSpots;
