import React, { useEffect, useState } from "react";
import {
  Store,
  Hash,
  Layers,
  Tag,
  CircleCheck,
  CircleX,
  AlertTriangle,
  Clock,
  Calendar,
} from "lucide-react";

function Adminshop() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFloor, setSelectedFloor] = useState("all");

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/shops");
      if (!response.ok) {
        throw new Error("Failed to fetch shops");
      }
      const data = await response.json();
      setShops(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching shops:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredShops = shops.filter((shop) => {
    const matchesSearch =
      shop.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.shopNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || shop.category === selectedCategory;
    const matchesFloor =
      selectedFloor === "all" || shop.floor === selectedFloor;
    return matchesSearch && matchesCategory && matchesFloor;
  });

  const categories = ["all", ...new Set(shops.map((shop) => shop.category))];
  const floors = ["all", ...new Set(shops.map((shop) => shop.floor))];

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="  bg-teal-900 text-white p-4 flex justify-between items-center mb-4">
        <div className="text-xl font-bold">Admin Dashboard</div>
        <div className="flex space-x-4">
          <a
            href="/admin"
            className="bg-teal-800 hover:bg-teal-700 px-4 py-2 rounded"
          >
            User Management
          </a>
          <a
            href="/adminshop"
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
            Memebership
          </a>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-teal-900 text-4xl font-bold">
          Shop Management Dashboard
        </h1>
        <a
          href="/shopadd"
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2.5 rounded-lg transition duration-300 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add New Shop
        </a>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search shops..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={selectedFloor}
          onChange={(e) => setSelectedFloor(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
        >
          {floors.map((floor) => (
            <option key={floor} value={floor}>
              {floor === "all" ? "All Floors" : `Floor ${floor}`}
            </option>
          ))}
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
          {error}
          <button
            onClick={fetchShops}
            className="ml-4 text-sm underline hover:no-underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Shop Cards */}
      {loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-900 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading shops...</p>
        </div>
      ) : filteredShops.length === 0 ? (
        <p className="text-center text-gray-600">
          No shops found matching your criteria.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {filteredShops.map((shop) => (
            <a
              href={`/adminshop/${shop._id}`}
              key={shop._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              {shop.imageFileName ? (
                <img
                  src={`http://localhost:3001/uploads/${shop.imageFileName}`}
                  alt={shop.shopName}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder-shop.png";
                  }}
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
                  No image available
                </div>
              )}

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="mb-2 space-y-3">
                  <h2 className="text-2xl font-bold text-teal-800 text-center capitalize flex items-center justify-center gap-2">
                    <Store className="w-6 h-6" /> {shop.shopName}
                  </h2>

                  <p className="text-lg text-gray-600 text-center flex items-center justify-center gap-2">
                    <Hash className="w-5 h-5" />
                    Shop No: {shop.shopNumber}
                    <Layers className="w-5 h-5 ml-4" />
                    Floor: {shop.floor}
                  </p>

                  <p className="text-lg text-gray-600 text-center flex items-center justify-center gap-2">
                    <Tag className="w-5 h-5" />
                    Category: {shop.category}
                  </p>

                  {/* Add Operating Hours */}
                  <div className="text-gray-600 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>
                        {shop.openTime && shop.closeTime
                          ? `${formatTime(shop.openTime)} - ${formatTime(
                              shop.closeTime
                            )}`
                          : "Hours not specified"}
                      </span>
                    </div>
                  </div>

                  {/* Add Operating Days */}
                  <div className="flex flex-wrap justify-center gap-1">
                    {shop.operatingDays &&
                      Object.entries(shop.operatingDays).map(
                        ([day, isOpen]) => (
                          <span
                            key={day}
                            className={`text-xs px-2 py-1 rounded-full ${
                              isOpen
                                ? "bg-teal-100 text-teal-800"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {day.slice(0, 3)}
                          </span>
                        )
                      )}
                  </div>
                </div>

                <div className="text-center mt-3">
                  <span
                    className={`inline-flex items-center justify-center px-36 py-2 text-sm font-semibold rounded-full capitalize  ${
                      shop.status === "available"
                        ? "bg-green-100 text-green-700"
                        : shop.status === "occupied"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {shop.status === "available" && (
                      <CircleCheck className="w-5 h-5 mr-1" />
                    )}
                    {shop.status === "occupied" && (
                      <CircleX className="w-5 h-5 mr-1" />
                    )}
                    {shop.status !== "available" &&
                      shop.status !== "occupied" && (
                        <AlertTriangle className="w-5 h-5 mr-1" />
                      )}
                    {shop.status}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default Adminshop;
