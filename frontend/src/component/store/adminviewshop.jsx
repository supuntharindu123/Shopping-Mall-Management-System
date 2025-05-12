import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Store,
  Tag,
  Clock,
  CircleCheck,
  CircleX,
  AlertTriangle,
  ChevronLeft,
  MapPin,
  Edit,
  Trash2,
  MoreVertical,
  PlusCircle,
  X,
  Upload,
} from "lucide-react";

function Adminviewshop() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [items, setItems] = useState([]);
  const [editForm, setEditForm] = useState({
    shopName: "",
    category: "",
    shopNumber: "",
    floor: "",
    description: "",
    status: "available",
    openTime: "",
    closeTime: "",
    operatingDays: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
  });
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    image: null,
  });
  const [currentItem, setCurrentItem] = useState({
    _id: "",
    name: "",
    price: "",
    image: null,
    imageFileName: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);

  useEffect(() => {
    fetchShopDetails();
    fetchItems();
  }, [id]);

  const fetchShopDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/shop/${id}`);
      if (!response.ok) throw new Error("Failed to fetch shop details");
      const data = await response.json();
      setShop(data);
      setEditForm({
        shopName: data.shopName,
        category: data.category,
        shopNumber: data.shopNumber,
        floor: data.floor,
        description: data.description || "",
        status: data.status || "available",
        openTime: data.openTime || "",
        closeTime: data.closeTime || "",
        operatingDays: data.operatingDays || {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false,
        },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/shop/${id}/items`
      );
      if (!response.ok) throw new Error("Failed to fetch items");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const formatTime = (time) =>
    time
      ? new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0D9488",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3001/api/shop/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          await Swal.fire("Deleted!", "Shop has been deleted.", "success");
          navigate("/admin/shops");
        } else {
          throw new Error("Failed to delete shop");
        }
      } catch (err) {
        Swal.fire("Error!", err.message, "error");
      }
    }
    setShowMenu(false);
  };

  const handleDeleteItem = async (itemId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0D9488",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/items/${itemId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          await fetchItems();
          Swal.fire("Deleted!", "Item has been deleted.", "success");
        } else {
          throw new Error("Failed to delete item");
        }
      } catch (err) {
        Swal.fire("Error!", err.message, "error");
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/shop/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        const updatedShop = await response.json();
        setShop(updatedShop);
        setShowEditModal(false);
        Swal.fire("Success!", "Shop updated successfully", "success");
      } else {
        throw new Error("Failed to update shop");
      }
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  const handleAddItemSubmit = async (e) => {
    e.preventDefault();

    if (!newItem.name || !newItem.price) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Please fill in all required fields",
        confirmButtonColor: "#DC2626",
      });
      return;
    }

    const formData = new FormData();
    // formData.append("shopId", id);
    formData.append("name", newItem.name);
    formData.append("price", newItem.price);
    if (newItem.image) {
      formData.append("image", newItem.image);
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/shop/${id}/items`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Item added successfully",
          confirmButtonColor: "#0D9488",
        });
        await fetchItems();
        setShowAddItemModal(false);
        setNewItem({ name: "", price: "", image: null });
        setImagePreview(null);
      } else {
        throw new Error("Failed to add item");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err.message,
        confirmButtonColor: "#DC2626",
      });
    }
  };

  const handleEditItemSubmit = async (e) => {
    e.preventDefault();

    if (!currentItem.name || !currentItem.price) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Please fill in all required fields",
        confirmButtonColor: "#DC2626",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", currentItem.name);
    formData.append("price", currentItem.price);
    if (currentItem.image) {
      formData.append("image", currentItem.image);
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/items/${currentItem._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        await fetchItems();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Item updated successfully",
          confirmButtonColor: "#0D9488",
        });
        setShowEditItemModal(false);
        setCurrentItem({
          _id: "",
          name: "",
          price: "",
          image: null,
          imageFileName: "",
        });
        setEditImagePreview(null);
      } else {
        throw new Error("Failed to update item");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err.message,
        confirmButtonColor: "#DC2626",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditItemInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewItem((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentItem((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setNewItem((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const handleRemoveEditImage = () => {
    setCurrentItem((prev) => ({ ...prev, image: null, imageFileName: "" }));
    setEditImagePreview(null);
  };

  const handleEditItem = (item) => {
    setCurrentItem({
      _id: item._id,
      name: item.name,
      price: item.price,
      image: null,
      imageFileName: item.imageFileName || "",
    });
    if (item.imageFileName) {
      setEditImagePreview(
        `http://localhost:3001/uploads/${item.imageFileName}`
      );
    } else {
      setEditImagePreview(null);
    }
    setShowEditItemModal(true);
  };

  const handleDayToggle = (day) => {
    setEditForm((prev) => ({
      ...prev,
      operatingDays: {
        ...prev.operatingDays,
        [day]: !prev.operatingDays[day],
      },
    }));
  };

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
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-teal-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Shops
          </button>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="More options"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <button
                  onClick={() => {
                    setShowEditModal(true);
                    setShowMenu(false);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Shop
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Shop
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="flex justify-center items-center mb-6 mt-6">
        <nav className="space-x-4 bg-teal-900 py-3 mr-10">
          <a
            href="/shopdashboard"
            className="text-white font-bold hover:bg-gray-800 transition duration-300 py-3 px-6"
          >
            Dashboard
          </a>
          <a
            href="/shopadd"
            className="text-white font-bold hover:bg-gray-800 transition duration-300 py-3 px-6"
          >
            Add Items
          </a>
          <a
            href={`/shop/${id}/transactions`}
            className="text-white font-bold hover:bg-gray-800 transition duration-300 py-3 px-6"
          >
            Transactions
          </a>
          <a
            href="/availableparkingspots"
            className="text-white font-bold hover:bg-gray-800 transition duration-300 py-3 px-6"
          >
            Available Spots
          </a>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Image */}
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

              {/* Shop Status */}
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

            {/* Content */}
            <div className="p-8">
              {/* Title */}
              <div className="mb-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                      {shop.shopName}
                    </h1>
                    <div className="flex items-center text-gray-600">
                      <Tag className="w-5 h-5 mr-2" />
                      <span className="capitalize">{shop.category}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Location */}
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

                {/* Hours */}
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

                  {/* Days */}
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

              {/* Items Section */}
              <div className="border-t border-gray-100 pt-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Menu Items
                  </h2>
                  <button
                    onClick={() => setShowAddItemModal(true)}
                    className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Add New Item
                  </button>
                </div>

                {items.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item) => (
                      <div
                        key={item._id}
                        className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow relative group"
                      >
                        {item.imageUrl && (
                          <div className="h-40 overflow-hidden">
                            <img
                              src={`http://localhost:3001/uploads/${item.imageUrl}`}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/placeholder-item.png";
                              }}
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-teal-600 font-medium">
                            ${parseFloat(item.price).toFixed(2)}
                          </p>
                        </div>
                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEditItem(item)}
                            className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4 text-teal-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item._id)}
                            className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No items added yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Shop Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Edit Shop Details
                </h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Shop Name *
                    </label>
                    <input
                      type="text"
                      name="shopName"
                      value={editForm.shopName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      name="category"
                      value={editForm.category}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="food">Food</option>
                      <option value="fashion">Fashion</option>
                      <option value="lifestyle">Lifestyle</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="all">All</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Shop Number *
                    </label>
                    <input
                      type="text"
                      name="shopNumber"
                      value={editForm.shopNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Floor *
                    </label>
                    <input
                      type="text"
                      name="floor"
                      value={editForm.floor}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status *
                    </label>
                    <select
                      name="status"
                      value={editForm.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="available">Available</option>
                      <option value="occupied">Occupied</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Opening Time
                    </label>
                    <input
                      type="time"
                      name="openTime"
                      value={editForm.openTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Closing Time
                    </label>
                    <input
                      type="time"
                      name="closeTime"
                      value={editForm.closeTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Operating Days
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(editForm.operatingDays).map(
                      ([day, isOpen]) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => handleDayToggle(day)}
                          className={`px-3 py-1 text-sm rounded-full ${
                            isOpen
                              ? "bg-teal-600 text-white"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Add New Item
                </h2>
                <button
                  onClick={() => {
                    setShowAddItemModal(false);
                    setNewItem({ name: "", price: "", image: null });
                    setImagePreview(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddItemSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newItem.name}
                    onChange={handleItemInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter item name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={newItem.price}
                    onChange={handleItemInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      {imagePreview ? (
                        <div className="mb-4">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="mx-auto h-32 w-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="mt-2 text-sm text-red-600 hover:text-red-800"
                          >
                            Remove Image
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="text-xs text-gray-500 mt-2">
                            PNG, JPG, JPEG up to 5MB
                          </p>
                        </>
                      )}
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            className="sr-only"
                            onChange={handleImageChange}
                            accept="image/*"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddItemModal(false);
                      setNewItem({ name: "", price: "", image: null });
                      setImagePreview(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {showEditItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Edit Item</h2>
                <button
                  onClick={() => {
                    setShowEditItemModal(false);
                    setCurrentItem({
                      _id: "",
                      name: "",
                      price: "",
                      image: null,
                      imageFileName: "",
                    });
                    setEditImagePreview(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleEditItemSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={currentItem.name}
                    onChange={handleEditItemInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter item name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={currentItem.price}
                    onChange={handleEditItemInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      {editImagePreview ? (
                        <div className="mb-4">
                          <img
                            src={editImagePreview}
                            alt="Preview"
                            className="mx-auto h-32 w-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveEditImage}
                            className="mt-2 text-sm text-red-600 hover:text-red-800"
                          >
                            Remove Image
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="text-xs text-gray-500 mt-2">
                            PNG, JPG, JPEG up to 5MB
                          </p>
                        </>
                      )}
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            className="sr-only"
                            onChange={handleEditImageChange}
                            accept="image/*"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditItemModal(false);
                      setCurrentItem({
                        _id: "",
                        name: "",
                        price: "",
                        image: null,
                        imageFileName: "",
                      });
                      setEditImagePreview(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg"
                  >
                    Update Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Adminviewshop;
