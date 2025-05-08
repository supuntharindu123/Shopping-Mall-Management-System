import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

function BookingPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [fullName, setFullName] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [parkingSpot, setParkingSpot] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [netAmount, setNetAmount] = useState(0);
  const [timeError, setTimeError] = useState("");
  const [id, setid] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      setid(category);
    }
  }, [category]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setFullName(userData.username);
  }, []);

  useEffect(() => {
    const fetchParkingData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/parkingcategory/${id}`
        );
        console.log("Parking data:", response.data); // Add this to debug

        setParkingSpot(response.data.name); // Set parkingSpot automatically
      } catch (error) {
        console.error("Error fetching parking data:", error);
      }
    };
    if (id) {
      fetchParkingData();
    }
  }, [id]);

  const handleTimeChange = (value, type) => {
    if (type === "arrival") {
      setArrivalTime(value);
      if (departureTime && value >= departureTime) {
        setTimeError("Arrival time must be before departure time");
        Swal.fire({
          title: "Error",
          text: "Arrival time must be before departure time",
          icon: "error",
          confirmButtonColor: "#115e59",
        });
        return;
      }
    } else {
      setDepartureTime(value);
      if (arrivalTime && value <= arrivalTime) {
        setTimeError("Departure time must be after arrival time");
        Swal.fire({
          title: "Error",
          text: "Departure time must be after arrival time",
          icon: "error",
          confirmButtonColor: "#115e59",
        });
        return;
      }
    }
    setTimeError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate times before submission
    if (timeError) {
      Swal.fire({
        title: "Error",
        text: timeError,
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
          status: "Pending",
        }),
      });

      const data = await response.json();

      if (response.ok && !timeError) {
        await Swal.fire({
          title: "Success",
          text: "Booking completed successfully!",
          icon: "success",
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
          title: "Error",
          text: data.message || "Something went wrong",
          icon: "error",
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-6">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-teal-900 text-2xl font-bold mb-4 text-center">
          Book & Pay for Parking
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-teal-900 font-medium ">Full Name:</label>
          <input
            type="text"
            value={fullName}
            disabled
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900 bg-gray-200"
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
          <input
            type="text"
            value={parkingSpot}
            disabled
            className="bg-gray-200 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900"
          />

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
