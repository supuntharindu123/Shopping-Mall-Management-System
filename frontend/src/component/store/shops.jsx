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

function AllShops() {
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
      <h1 className="text-4xl font-bold text-center text-teal-900 mb-8">
        All Shops
      </h1>

      {/* Search and Filter Section */}
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
              href={`/shop/${shop._id}`}
              key={shop._id}
              className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
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
                    {shop.shopName}
                  </h2>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllShops;
