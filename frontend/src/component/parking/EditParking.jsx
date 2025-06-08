import React from "react";
import { useSearchParams } from "react-router-dom";

function EditParking() {
  const [searchParams] = useSearchParams();
  const parkingId = searchParams.get("id");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-teal-900 text-3xl font-bold text-center mb-6">
        Edit Parking Spot
      </h2>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <p className="text-teal-900 font-medium">
          Editing Parking Spot ID: {parkingId}
        </p>
        {/* Add form or other content for editing */}
      </div>
    </div>
  );
}

export default EditParking;

