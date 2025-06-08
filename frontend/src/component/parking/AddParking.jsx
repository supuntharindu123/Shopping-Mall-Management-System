import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddParking() {
  const [fullName, setFullName] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [parkingSpot, setParkingSpot] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [netAmount, setNetAmount] = useState(0);
  const navigate = useNavigate();

  const parkingRates = {
    "Basement Parking": 2.0,
    "1st Floor Parking": 1.5,
    "Backyard Parking": 0.0,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, licensePlate, parkingSpot,vehicleType,arrivalTime,departureTime,netAmount }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Parking Added Successfully");
       setArrivalTime("");	
        setDepartureTime("");
        setFullName("");
        setLicensePlate("");
        setParkingSpot("");
        setVehicleType("");
        setNetAmount(0);
        navigate("/");
      } else {
        alert(`Error: ${data.message || "Failed to add parking"}`);
      }
    } catch (error) {
      console.error("Error Adding Parking:", error);
      alert("Error connecting to server");
    }
  };

  const calculateAmount = () => {
    if (arrivalTime && departureTime && parkingSpot) {
      const arrival = new Date(arrivalTime);
      const departure = new Date(departureTime);
      const duration = (departure - arrival) / (1000 * 60 * 60); // Convert ms to hours
      const pricePerHour = parkingRates[parkingSpot] || 0;
      setNetAmount(duration * pricePerHour);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-teal-900 text-2xl font-bold mb-4 text-center">Book & Pay for Parking</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-teal-900 font-medium">Full Name:</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900" />

          <label className="block text-teal-900 font-medium">License Plate:</label>
          <input type="text" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900" />

          <label className="block text-teal-900 font-medium">Parking Type:</label>
          <select value={parkingSpot} onChange={(e) => setParkingSpot(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900">
            <option value="">Select Parking Type</option>
            <option value="Basement Parking">Basement Parking</option>
            <option value="1st Floor Parking">1st Floor Parking</option>
            <option value="Backyard Parking">Backyard Parking</option>
          </select>

          <label className="block text-teal-900 font-medium">Vehicle Type:</label>
          <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900">
            <option value="">Select Vehicle Type</option>
            <option value="Car">Car</option>
            <option value="Truck">Truck</option>
            <option value="Motorcycle">Motorcycle</option>
            <option value="SUV">SUV</option>
          </select>

          <label className="block text-teal-900 font-medium">Arrival Time:</label>
          <input type="datetime-local" value={arrivalTime} onChange={(e) => { setArrivalTime(e.target.value); calculateAmount(); }} required className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900" />

          <label className="block text-teal-900 font-medium">Departure Time:</label>
          <input type="datetime-local" value={departureTime} onChange={(e) => { setDepartureTime(e.target.value); calculateAmount(); }} required className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900" />

          <div className="bg-teal-900 text-white p-2 rounded-lg text-center">
            <p className="font-medium">Total Price: ${netAmount.toFixed(2)}</p>
          </div>

          <button type="submit" className="w-full bg-teal-900 text-white py-2 rounded-lg hover:bg-gray-400 transition">
            Confirm & Pay
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddParking;
