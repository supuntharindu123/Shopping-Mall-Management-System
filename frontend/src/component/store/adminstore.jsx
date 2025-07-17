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
  Search,
  Filter,
  Plus,
  RefreshCw,
  BarChart3,
  Users,
  Building2,
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

  // Statistics calculation
  const stats = {
    total: shops.length,
    available: shops.filter((shop) => shop.status === "available").length,
    occupied: shops.filter((shop) => shop.status === "occupied").length,
    maintenance: shops.filter((shop) => shop.status === "maintenance").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
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
            Memberships
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-teal-900 mb-2">
                Shop Management Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                Manage and monitor all shops in your mall
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="/shopadd"
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2.5 rounded-lg transition duration-300 flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Add New Shop
              </a>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Shops</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Store className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.available}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CircleCheck className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Occupied</p>
                <p className="text-3xl font-bold text-red-600">
                  {stats.occupied}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <CircleX className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Maintenance</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {stats.maintenance}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-700">
              Filter & Search
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search shops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all"
                    ? "All Categories"
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {floors.map((floor) => (
                <option key={floor} value={floor}>
                  {floor === "all" ? "All Floors" : `Floor ${floor}`}
                </option>
              ))}
            </select>
          </div>

          {/* Results Summary */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold">{filteredShops.length}</span> of{" "}
              <span className="font-semibold">{shops.length}</span> shops
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
            <div className="flex items-center justify-between">
              <span className="font-medium">{error}</span>
              <button
                onClick={fetchShops}
                className="text-sm underline hover:no-underline"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Shop Cards */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading shops...</p>
            </div>
          </div>
        ) : filteredShops.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12">
            <div className="text-center">
              <Store className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-2">No shops found</p>
              <p className="text-gray-500">
                {shops.length === 0
                  ? "No shops have been added yet."
                  : "No shops match your current filters."}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops.map((shop) => (
              <a
                href={`/adminshop/${shop._id}`}
                key={shop._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                {/* Shop Image */}
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
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <Store className="h-16 w-16 text-gray-400" />
                  </div>
                )}

                {/* Shop Details */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-teal-800 mb-3 flex items-center gap-2">
                      <Store className="w-5 h-5" />
                      {shop.shopName}
                    </h3>

                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4" />
                        <span>Shop No: {shop.shopNumber}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4" />
                        <span>Floor: {shop.floor}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        <span>Category: {shop.category}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          {shop.openTime && shop.closeTime
                            ? `${formatTime(shop.openTime)} - ${formatTime(
                                shop.closeTime
                              )}`
                            : "Hours not specified"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Operating Days */}
                  {shop.operatingDays && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(shop.operatingDays).map(
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
                  )}

                  {/* Status */}
                  <div className="pt-4 border-t border-gray-100">
                    <span
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                        shop.status === "available"
                          ? "bg-green-100 text-green-700"
                          : shop.status === "occupied"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {shop.status === "available" && (
                        <CircleCheck className="w-4 h-4 mr-1" />
                      )}
                      {shop.status === "occupied" && (
                        <CircleX className="w-4 h-4 mr-1" />
                      )}
                      {shop.status !== "available" &&
                        shop.status !== "occupied" && (
                          <AlertTriangle className="w-4 h-4 mr-1" />
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
    </div>
  );
}

export default Adminshop;
