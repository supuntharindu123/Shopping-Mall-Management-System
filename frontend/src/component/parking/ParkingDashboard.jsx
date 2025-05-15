import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa"; // Import React Icons
import Swal from "sweetalert2"; // Import SweetAlert2
import axios from "axios";

function ParkingDashboard() {
  const [parkingData, setParkingData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");
  const [parkingBookings, setParkingBookings] = useState([]); // Add new state for bookings
  const [statusFilter, setStatusFilter] = useState("all"); // Add new state for status filter
  const [isUpdating, setIsUpdating] = useState(false); // Add new state for updating status

  // Fetch parking data from API

  // Add new useEffect to fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/getbooking");
        const data = await response.json();
        if (data.success) {
          setParkingBookings(data.bookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const downloadBookingReport = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/getbooking", {
        responseType: "blob",
      });

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "parking_booking_report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to download report", error);
    }
  };

  const updateParking = (id) => {
    // Implement update functionality here (e.g., show a form to edit the parking details)
    alert(`Update functionality for ID: ${id}`);
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      setIsUpdating(true);
      const response = await fetch(
        `http://localhost:3001/api/booking/${bookingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Update local state to reflect the change
        setParkingBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: newStatus }
              : booking
          )
        );

        // Show success message
        Swal.fire({
          icon: "success",
          title: "Status Updated",
          text: `Booking status has been updated to ${newStatus}`,
          confirmButtonColor: "#115e59",
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update booking status",
        confirmButtonColor: "#115e59",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const getFilteredBookings = () => {
    if (statusFilter === "all") return parkingBookings;
    return parkingBookings.filter((booking) => booking.status === statusFilter);
  };

  const getFilteredData = () => {
    return parkingData.filter((item) => {
      const matchesSearch =
        item.parkingCategory.toLowerCase().includes(search.toLowerCase()) ||
        item.vehicleType.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        filterCategory === "" || item.parkingCategory === filterCategory;

      const matchesType = filterType === "" || item.vehicleType === filterType;

      return matchesSearch && matchesCategory && matchesType;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-teal-900 text-white p-4 flex justify-between items-center mb-4">
        <div className="text-xl font-bold">Admin Dashboard</div>
        <div className="flex space-x-4">
          <a
            href="/admin"
            className="bg-teal-800 hover:bg-teal-700 px-4 py-2 rounded"
          >
            User Management
          </a>
          <a
            href="/adminshop "
            className="bg-teal-800 hover:bg-teal-700 px-4 py-2 rounded"
          >
            Shop Management
          </a>
          <a
            href="/parkingdashboard"
            className="bg-teal-800 hover:bg-teal-700 px-4 py-2 rounded"
          >
            Parking Management
          </a>
          <a
            href="/membershipadmin"
            className="bg-teal-800 hover:bg-teal-700 px-4 py-2 rounded"
          >
            Membership
          </a>
        </div>
      </div>
      <h1 className="text-teal-900 text-4xl font-bold text-center mb-8">
        Parking Management Dashboard
      </h1>

      <div className="float-right mb-6 mr-36">
        <nav className="space-x-4 bg-teal-400 py-3 px-6 rounded-lg shadow-md">
          <a
            href="/parkingcategory"
            className="text-white font-bold hover:bg-gray-700 transition duration-300 py-2 px-4 rounded"
          >
            Add Categories
          </a>
          <button
            onClick={downloadBookingReport}
            className="text-white font-bold hover:bg-gray-700 transition duration-300 py-2 px-4 rounded"
          >
            Parking Report
          </button>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        {/* Add new section for bookings */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-teal-900">
              Parking Bookings
            </h2>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="cancelled">Cancelled</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-teal-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    License Plate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Spot
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Vehicle Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Arrival
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Departure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getFilteredBookings().map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.licensePlate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.parkingSpot}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.vehicleType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(booking.arrivalTime).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(booking.departureTime).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${
                            booking.status === "active"
                              ? "bg-green-100 text-green-800"
                              : booking.status === "completed"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <select
                        value={booking.status}
                        onChange={(e) =>
                          handleStatusUpdate(booking._id, e.target.value)
                        }
                        disabled={isUpdating}
                        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {getFilteredBookings().length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No parking bookings found for selected status
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParkingDashboard;
