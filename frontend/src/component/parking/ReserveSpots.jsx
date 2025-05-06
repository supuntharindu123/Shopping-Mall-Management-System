import React, { useState } from "react";
import Swal from "sweetalert2";

function ReserveSpots() {
  const [reservation, setReservation] = useState({
    name: "",
    vehicleNumber: "",
    spotId: "",
    startTime: "",
    endTime: "",
  });

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/reserve-spot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservation),
      });

      if (response.ok) {
        Swal.fire("Success", "Spot reserved successfully", "success");
        // Reset form
        setReservation({
          name: "",
          vehicleNumber: "",
          spotId: "",
          startTime: "",
          endTime: "",
        });
      }
    } catch (error) {
      Swal.fire("Error", "Failed to reserve spot", "error");
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
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-teal-900 mb-6">
          Reserve a Parking Spot
        </h1>

        <form onSubmit={handleReservation} className="space-y-6">
          {/* Add form fields */}
          <button
            type="submit"
            className="w-full bg-teal-900 text-white py-2 px-4 rounded-md hover:bg-teal-800"
          >
            Reserve Spot
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReserveSpots;
