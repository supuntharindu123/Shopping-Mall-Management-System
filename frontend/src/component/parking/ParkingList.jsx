import React from "react";
import { Link } from "react-router-dom";

const parkingSpots = [
  { id: 1, name: "Basement Parking" },
  { id: 2, name: "1st Floor Parking" },
  { id: 3, name: "Backyard Parking" }
];

function ParkingList() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-teal-900 text-3xl font-bold text-center mb-6">
        Parking List
      </h2>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        {parkingSpots.map((spot) => (
          <div key={spot.id} className="flex justify-between items-center p-4 border-b border-gray-300">
            <span className="text-teal-900 font-medium">{spot.name}</span>
            <div>
              <Link to={`/editparking?id=${spot.id}`} className="text-teal-900 hover:text-gray-400 mr-4">
                Edit
              </Link>
              <button className="text-red-600 hover:text-red-400">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParkingList;
