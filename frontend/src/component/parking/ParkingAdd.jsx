import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaParking } from "react-icons/fa";

function ParkingAdd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    parkingCategory: "",
    vehicleType: "",
    location: "",
    spots: "",
    rate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/parkings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire("Success", "Parking added successfully", "success");
        navigate("/parkingdashboard");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to add parking", "error");
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
        <input
          type="text"
          placeholder="Search..."
          className="border p-3 rounded-lg w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-teal-900 mb-6 flex items-center">
          <FaParking className="mr-2" />
          Add New Parking Area
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={formData.parkingCategory}
              onChange={(e) =>
                setFormData({ ...formData, parkingCategory: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              required
            >
              <option value="">Select Category</option>
              <option value="Basement">Basement</option>
              <option value="Ground">Ground Level</option>
              <option value="Open">Open Space</option>
            </select>
          </div>

          {/* Add other form fields */}

          <button
            type="submit"
            className="w-full bg-teal-900 text-white py-2 px-4 rounded-md hover:bg-teal-800"
          >
            Add Parking Area
          </button>
        </form>
      </div>
    </div>
  );
}

export default ParkingAdd;
