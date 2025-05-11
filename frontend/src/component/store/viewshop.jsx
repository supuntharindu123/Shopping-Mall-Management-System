import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Store,
  Hash,
  Layers,
  Tag,
  Clock,
  Calendar,
  CircleCheck,
  CircleX,
  AlertTriangle,
  ChevronLeft,
  Package,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

function Viewshop() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchShopDetails();
  }, [id]);

  const fetchShopDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/shop/${id}`);
      if (!response.ok) throw new Error("Failed to fetch shop details");
      const data = await response.json();
      setShop(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time) =>
    new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
        <button
          onClick={fetchShopDetails}
          className="mt-2 text-teal-600 underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!shop) {
    return <div className="text-center p-4">Shop not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-teal-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Shops
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Image Section with Overlay */}
            <div className="relative h-96 overflow-hidden group">
              {shop.imageFileName ? (
                <>
                  <img
                    src={`http://localhost:3001/uploads/${shop.imageFileName}`}
                    alt={shop.shopName}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-shop.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </>
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <Store className="w-20 h-20 text-gray-300" />
                </div>
              )}

              {/* Shop Status Badge */}
              <div className="absolute top-4 right-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center shadow-lg backdrop-blur-md ${
                    shop.status === "available"
                      ? "bg-green-100/90 text-green-700"
                      : shop.status === "occupied"
                      ? "bg-red-100/90 text-red-700"
                      : "bg-yellow-100/90 text-yellow-700"
                  }`}
                >
                  {shop.status === "available" && (
                    <CircleCheck className="w-4 h-4 mr-2" />
                  )}
                  {shop.status === "occupied" && (
                    <CircleX className="w-4 h-4 mr-2" />
                  )}
                  {shop.status !== "available" &&
                    shop.status !== "occupied" && (
                      <AlertTriangle className="w-4 h-4 mr-2" />
                    )}
                  {shop.status}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              {/* Shop Name and Category */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {shop.shopName}
                </h1>
                <div className="flex items-center text-gray-600">
                  <Tag className="w-5 h-5 mr-2" />
                  <span className="capitalize">{shop.category}</span>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Location Info */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Location
                  </h2>
                  <div className="flex items-start space-x-3 text-gray-600">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Shop #{shop.shopNumber}</p>
                      <p>Floor {shop.floor}</p>
                    </div>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Hours & Days
                  </h2>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Clock className="w-5 h-5 flex-shrink-0" />
                    <span>
                      {shop.openTime && shop.closeTime
                        ? `${formatTime(shop.openTime)} - ${formatTime(
                            shop.closeTime
                          )}`
                        : "Hours not specified"}
                    </span>
                  </div>

                  {/* Operating Days */}
                  <div className="flex flex-wrap gap-2">
                    {shop.operatingDays &&
                      Object.entries(shop.operatingDays).map(
                        ([day, isOpen]) => (
                          <span
                            key={day}
                            className={`px-3 py-1 text-sm rounded-full ${
                              isOpen
                                ? "bg-teal-50 text-teal-700 border border-teal-200"
                                : "bg-gray-50 text-gray-400 border border-gray-200"
                            }`}
                          >
                            {day.slice(0, 3)}
                          </span>
                        )
                      )}
                  </div>
                </div>
              </div>

              {/* Description */}
              {shop.description && (
                <div className="border-t border-gray-100 pt-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    About
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {shop.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewshop;
