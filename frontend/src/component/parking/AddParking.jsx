import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function BookingPage() {
  const [fullName, setFullName] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [parkingSpot, setParkingSpot] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [netAmount, setNetAmount] = useState(0);
  const [isTimeSlotAvailable, setIsTimeSlotAvailable] = useState(true);
  const [timeError, setTimeError] = useState("");
  const navigate = useNavigate();

  const parkingRates = {
    "Basement Parking": 2.0,
    "1st Floor Parking": 1.5,
    "Backyard Parking": 0.0,
  };

  const checkTimeSlotAvailability = async (start, end, spot) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/check-availability",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            parkingSpot: spot,
            arrivalTime: start,
            departureTime: end,
          }),
        }
      );
      const data = await response.json();

      Swal.fire({
        title: data.title,
        text: data.message,
        icon: data.icon,
        confirmButtonColor: "#115e59",
      });

      setIsTimeSlotAvailable(data.isAvailable);
      setTimeError(data.isAvailable ? "" : "This time slot is already booked");
      return data.isAvailable;
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Unable to check availability",
        icon: "error",
        confirmButtonColor: "#115e59",
      });
      setTimeError("Error checking availability");
      return false;
    }
  };

  const handleTimeChange = async (value, type) => {
    if (type === "arrival") {
      setArrivalTime(value);
      if (departureTime && value >= departureTime) {
        setTimeError("Arrival time must be before departure time");
        setIsTimeSlotAvailable(false);
        return;
      }
    } else {
      setDepartureTime(value);
      if (arrivalTime && value <= arrivalTime) {
        setTimeError("Departure time must be after arrival time");
        setIsTimeSlotAvailable(false);
        return;
      }
    }

    if (parkingSpot && arrivalTime && departureTime) {
      await checkTimeSlotAvailability(
        type === "arrival" ? value : arrivalTime,
        type === "departure" ? value : departureTime,
        parkingSpot
      );
      calculateAmount();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isTimeSlotAvailable) {
      Swal.fire({
        title: "Error",
        text: "Please select an available time slot",
        icon: "error",
        confirmButtonColor: "#115e59",
      });
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          licensePlate,
          parkingSpot,
          vehicleType,
          arrivalTime,
          departureTime,
          netAmount,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await Swal.fire({
          title: data.title,
          text: data.message,
          icon: data.icon,
          confirmButtonColor: "#115e59",
        });

        setArrivalTime("");
        setDepartureTime("");
        setFullName("");
        setLicensePlate("");
        setParkingSpot("");
        setVehicleType("");
        setNetAmount(0);
        navigate("/");
      } else {
        Swal.fire({
          title: data.title,
          text: data.message,
          icon: data.icon,
          confirmButtonColor: "#115e59",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Unable to process your booking",
        icon: "error",
        confirmButtonColor: "#115e59",
      });
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-6">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-teal-900 text-2xl font-bold mb-4 text-center">
          Book & Pay for Parking
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-teal-900 font-medium">Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900"
          />

          <label className="block text-teal-900 font-medium">
            License Plate:
          </label>
          <input
            type="text"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900"
          />

          <label className="block text-teal-900 font-medium">
            Parking Type:
          </label>
          <select
            value={parkingSpot}
            onChange={(e) => setParkingSpot(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900"
          >
            <option value="">Select Parking Type</option>
            <option value="Basement Parking">Basement Parking</option>
            <option value="1st Floor Parking">1st Floor Parking</option>
            <option value="Backyard Parking">Backyard Parking</option>
          </select>

          <label className="block text-teal-900 font-medium">
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

          <label className="block text-teal-900 font-medium">
            Arrival Time:
          </label>
          <input
            type="datetime-local"
            value={arrivalTime}
            onChange={(e) => handleTimeChange(e.target.value, "arrival")}
            required
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 
              ${timeError ? "border-red-500" : "border-gray-300"} 
              focus:ring-teal-900`}
          />

          <label className="block text-teal-900 font-medium">
            Departure Time:
          </label>
          <input
            type="datetime-local"
            value={departureTime}
            onChange={(e) => handleTimeChange(e.target.value, "departure")}
            required
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 
              ${timeError ? "border-red-500" : "border-gray-300"} 
              focus:ring-teal-900`}
          />

          {timeError && (
            <div className="text-red-500 text-sm mt-1">{timeError}</div>
          )}

          {isTimeSlotAvailable && arrivalTime && departureTime && (
            <div className="text-green-500 text-sm mt-1">
              Time slot available!
            </div>
          )}

          <div className="bg-teal-900 text-white p-2 rounded-lg text-center">
            <p className="font-medium">Total Price: ${netAmount.toFixed(2)}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-900 text-white py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Confirm & Pay
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingPage;
