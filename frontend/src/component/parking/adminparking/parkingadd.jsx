import { useNavigate } from "react-router-dom";
import React, { useState } from "react";


function AddParking() {
  const [parkingCategory, setParkingCategory] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/parking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ parkingCategory, vehicleType, location }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Parking Added Successfully");
        setParkingCategory("");
        setVehicleType("");
        setLocation("");
        navigate("/parkingdashboard")
      } else {
        alert(`Error: ${data.message || "Failed to add parking"}`);
      }
    } catch (error) {
      console.error("Error Adding Parking:", error);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-teal-900 text-3xl font-bold mb-6 text-center">
          Add Parking
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Parking Name (Categories) */}
          <div>
            <label className="block text-teal-900 font-medium mb-1">
              Parking Category:
            </label>
            <select
              value={parkingCategory}
              onChange={(e) => setParkingCategory(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900"
            >
              <option value="">Select Category</option>
              <option value="Basement Parking">Basement Parking</option>
              <option value="1st Floor Parking">1st Floor Parking</option>
              <option value="Backyard Parking">Backyard Parking</option>
            </select>
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block text-teal-900 font-medium mb-1">
              Vehicle Type:
            </label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900"
            >
              <option value="">Select Vehicle Type</option>
              <option value="Car">Car</option>
              <option value="Truck">Truck</option>
              <option value="Motorcycle">Motorcycle</option>
              <option value="SUV">SUV</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-teal-900 font-medium mb-1">
              Location:
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-900 text-white py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Add Parking
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddParking;
