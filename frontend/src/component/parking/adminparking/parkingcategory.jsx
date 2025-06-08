import React, { useState, useEffect } from "react";
import { FaParking, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const ParkingCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    hourlyRate: "",
    totalSpots: "",
    description: "",
    securityFeatures: "",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/parkingcategory"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newCategory.name);
      formData.append("hourlyRate", newCategory.hourlyRate);
      formData.append("totalSpots", newCategory.totalSpots);
      formData.append("description", newCategory.description);
      formData.append("securityFeatures", newCategory.securityFeatures);
      if (newCategory.image) {
        formData.append("image", newCategory.image);
      }

      if (isEditing) {
        await axios.put(
          `http://localhost:3001/api/parkingcategory/${editId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        Swal.fire("Success", "Category updated successfully", "success");
      } else {
        await axios.post(
          "http://localhost:3001/api/parkingcategory",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        Swal.fire("Success", "Category added successfully", "success");
      }
      setNewCategory({
        name: "",
        hourlyRate: "",
        totalSpots: "",
        description: "",
        securityFeatures: "",
        image: null,
      });
      setIsEditing(false);
      setEditId(null);
      fetchCategories();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Operation failed",
        "error"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#115e59",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3001/api/parkingcategory/${id}`);
        Swal.fire("Deleted!", "Category has been deleted.", "success");
        fetchCategories();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to delete category", "error");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-teal-900 text-4xl font-bold text-center mb-8">
        Parking Management Dashboard
      </h1>

      <div className="flex justify-center items-center mb-6">
        <nav className="space-x-4 bg-teal-900  py-3 mr-10">
          <a
            href="/parkingdashboard"
            className="text-white font-bold hover:bg-gray-800 transition duration-300 py-3 px-6"
          >
            Dashboard
          </a>

          <a
            href="/parkingcategory"
            className="text-white font-bold hover:bg-gray-800 transition duration-300 py-3 px-6"
          >
            Add Categories
          </a>
        </nav>
      </div>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-teal-900 mb-8 flex items-center">
          <FaParking className="mr-2" />
          Parking Categories Management
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Add/Edit Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-teal-900">
              {isEditing ? "Edit Category" : "Add New Category"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category Name
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hourly Rate ($)
                </label>
                <input
                  type="number"
                  value={newCategory.hourlyRate}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      hourlyRate: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Total Spots
                </label>
                <input
                  type="number"
                  value={newCategory.totalSpots}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      totalSpots: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  required
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      description: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Security Features
                </label>
                <textarea
                  value={newCategory.securityFeatures}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      securityFeatures: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  placeholder="CCTV, Security Guards, Access Control, etc."
                  rows="2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Parking Area Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      image: e.target.files[0],
                    })
                  }
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-teal-50 file:text-teal-700
                    hover:file:bg-teal-100"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal-900 text-white py-2 px-4 rounded-md hover:bg-teal-800 transition-colors"
              >
                {isEditing ? "Update Category" : "Add Category"}
              </button>
            </form>
          </div>

          {/* Categories List */}
          <div className="bg-white p-6 rounded-lg shadow-lg overflow-auto max-h-[800px]">
            <h2 className="text-xl font-semibold mb-4 text-teal-900">
              Existing Categories
            </h2>
            <div className="space-y-4">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg text-teal-900">
                          {category.name}
                        </h3>
                        <div className="space-x-2 flex">
                          <button
                            onClick={() => {
                              setNewCategory(category);
                              setIsEditing(true);
                              setEditId(category._id);
                            }}
                            className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                          >
                            <FaEdit size={20} />
                          </button>
                          <button
                            onClick={() => handleDelete(category._id)}
                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                          >
                            <FaTrash size={20} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="bg-teal-50 p-2 rounded">
                          <p className="text-sm text-teal-900 font-medium">
                            Hourly Rate
                          </p>
                          <p className="text-lg font-bold text-teal-700">
                            ${category.hourlyRate}/hr
                          </p>
                        </div>
                        <div className="bg-teal-50 p-2 rounded">
                          <p className="text-sm text-teal-900 font-medium">
                            Total Spots
                          </p>
                          <p className="text-lg font-bold text-teal-700">
                            {category.totalSpots}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Description: </span>
                          {category.description}
                        </p>
                        {category.securityFeatures && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">
                              Security Features:{" "}
                            </span>
                            {category.securityFeatures}
                          </p>
                        )}
                      </div>
                    </div>

                    {category.image && (
                      <div className="flex-shrink-0">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-32 h-32 object-cover rounded-lg shadow-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingCategory;
