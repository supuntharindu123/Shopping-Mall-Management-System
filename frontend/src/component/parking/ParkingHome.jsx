import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ParkingHome() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/parkingcategory"
        );
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load parking categories");
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center text-red-600">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-teal-900 text-3xl font-bold text-center mb-4">
        Choose Your Parking Space
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Find the best parking space based on availability, security, and
        pricing.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {categories.map((category) => (
          <div
            key={category._id}
            className="bg-white p-6 rounded-2xl shadow-lg text-center"
          >
            {category.image && (
              <img
                src={category.image}
                alt={category.name}
                className="rounded-lg mb-4 w-full h-48 object-cover"
              />
            )}
            <h3 className="text-teal-900 text-xl font-semibold">
              {category.name}
            </h3>

            <p className="text-gray-700 font-medium">
              Price: ${category.hourlyRate}/hr
            </p>
            <p className="text-gray-700 font-medium">
              Security: {category.securityFeatures}
            </p>
            <p className="text-gray-600 text-sm mt-2">{category.description}</p>

            <Link
              to={`/Addparking?category=${category._id}&duration=${selectedDuration}`}
              className="block mt-4 bg-teal-900 text-white py-2 px-4 rounded-lg hover:bg-gray-400"
            >
              Select {category.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParkingHome;
