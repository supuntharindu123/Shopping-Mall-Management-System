import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa"; // Import React Icons

function ParkingList() {
  const [parkingData, setParkingData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");

  // Fetch parking data from API
  useEffect(() => {
    const fetchParkingData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/parkings"); // Replace with actual API URL
        const data = await response.json();
        setParkingData(data);
      } catch (error) {
        console.error("Error fetching parking data:", error);
      }
    };

    fetchParkingData();
  }, []);

  // Delete parking and refetch data
  const deleteParking = async (id) => {
    try {
      console.log("Deleting parking with ID:", id);

      // Perform delete request
      await fetch(`http://localhost:3001/api/parkings/${id}`, {
        method: "DELETE",
      });

      // Refetch the data after deletion
      const response = await fetch("http://localhost:3001/api/parkings"); // Fetch updated data
      const data = await response.json();
      setParkingData(data); // Update state with new data
    } catch (error) {
      console.error("Error deleting parking:", error);
    }
  };

  const updateParking = (id) => {
    // Implement update functionality here (e.g., show a form to edit the parking details)
    alert(`Update functionality for ID: ${id}`);
  };

  const filteredData = parkingData.filter(
    (item) =>
      item.parkingCategory.includes(filterCategory) &&
      item.vehicleType.includes(filterType) &&
      (item.parkingCategory.toLowerCase().includes(search.toLowerCase()) ||
        item.vehicleType.toLowerCase().includes(search.toLowerCase()))
  );

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
            href="/store"
            className="bg-teal-800 hover:bg-teal-700 px-4 py-2 rounded"
          >
            Store Management
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
            Transaction
          </a>
        </div>
      </div>
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
            href="/addcategories"
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

      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <div className="mb-4 flex gap-4 justify-between">
          <select
            className="border p-3 rounded-lg"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Basement">Basement</option>
            <option value="Ground">Ground</option>
            <option value="Open">Open</option>
          </select>
          <select
            className="border p-3 rounded-lg"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
          </select>
        </div>

        <div className="space-y-6">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-teal-900 text-2xl font-semibold">
                    {item.parkingCategory}
                  </h3>
                  <p className="text-teal-500">{item.vehicleType}</p>
                  <p className="text-teal-400">{item.location}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    className="text-red-600 hover:text-red-800 transition duration-300"
                    onClick={() => deleteParking(item._id)}
                  >
                    <FaTrash />
                  </button>
                  <button
                    className="text-yellow-600 hover:text-yellow-800 transition duration-300"
                    onClick={() => updateParking(item.id)}
                  >
                    <FaEdit />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ParkingList;
