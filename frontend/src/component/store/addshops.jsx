import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Addshops() {
  const navigate = useNavigate();
  const [shopData, setShopData] = useState({
    shopName: "",
    shopNumber: "",
    category: "",
    floor: "",
    status: "available",
    description: "",
    openTime: "",
    closeTime: "",
    operatingDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },
  });
  const [shopImage, setShopImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShopData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setShopImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    Swal.fire({
      title: "Remove Image?",
      text: "Are you sure you want to remove this image?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0D9488",
      cancelButtonColor: "#DC2626",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setShopImage(null);
        setImagePreview(null);
      }
    });
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will lose all entered data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0D9488",
      cancelButtonColor: "#DC2626",
      confirmButtonText: "Yes, cancel",
      cancelButtonText: "No, keep editing",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/adminshop");
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "shopName",
      "shopNumber",
      "category",
      "floor",
      "openTime",
      "closeTime",
    ];
    const emptyFields = requiredFields.filter((field) => !shopData[field]);

    if (emptyFields.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Required Fields Empty",
        text: `Please fill in: ${emptyFields.join(", ")}`,
        confirmButtonColor: "#0D9488",
      });
      return;
    }

    const formData = new FormData();

    Object.keys(shopData).forEach((key) => {
      if (key === "operatingDays") {
        formData.append(key, JSON.stringify(shopData[key]));
      } else {
        formData.append(key, shopData[key]);
      }
    });

    if (shopImage) {
      formData.append("image", shopImage);
    }

    try {
      const response = await fetch("http://localhost:3001/api/addshop", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Shop added successfully",
          confirmButtonColor: "#0D9488",
        });

        setShopData({
          shopName: "",
          shopNumber: "",
          category: "",
          floor: "",
          status: "available",
          description: "",
          openTime: "",
          closeTime: "",
          operatingDays: {
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: true,
            sunday: true,
          },
        });
        setShopImage(null);
        setImagePreview(null);
        navigate("/adminshop");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add shop");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "An error occurred while adding the shop",
        confirmButtonColor: "#DC2626",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center mb-6"></div>

      <h1 className="text-teal-900 text-4xl font-bold text-center mb-8 mt-8">
        Shop Management Dashboard
      </h1>

      <div className="flex justify-center items-center mb-6"> </div>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md my-6">
        <h2 className="text-2xl font-bold text-teal-900 mb-6 text-center">
          Add New Shop
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Shop Name</label>
              <input
                type="text"
                name="shopName"
                value={shopData.shopName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Shop Number</label>
              <input
                type="text"
                name="shopNumber"
                value={shopData.shopNumber}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={shopData.category}
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
              <label className="block text-gray-700 mb-2">Floor</label>
              <input
                type="text"
                name="floor"
                value={shopData.floor}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Opening Time</label>
                <input
                  type="time"
                  name="openTime"
                  value={shopData.openTime}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Closing Time</label>
                <input
                  type="time"
                  name="closeTime"
                  value={shopData.closeTime}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
                  required
                />
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700 mb-2">Operating Days</label>
              <div className="grid grid-cols-7 gap-2">
                {Object.keys(shopData.operatingDays).map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => {
                      setShopData((prev) => ({
                        ...prev,
                        operatingDays: {
                          ...prev.operatingDays,
                          [day]: !prev.operatingDays[day],
                        },
                      }));
                    }}
                    className={`p-2 rounded text-sm capitalize ${
                      shopData.operatingDays[day]
                        ? "bg-teal-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {day.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={shopData.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Enter details about the shop, its features, and specifications..."
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500 resize-none"
              ></textarea>
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 mb-2">Shop Image</label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
                />
                {imagePreview && (
                  <div className="relative w-24 h-24">
                    <img
                      src={imagePreview}
                      alt="Shop preview"
                      className="w-full h-full object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <div className="flex-1 flex gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-teal-900 text-white py-2 px-4 rounded hover:bg-teal-800 transition duration-300"
              >
                Add Shop
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addshops;
