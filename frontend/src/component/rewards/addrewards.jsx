import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Swal from "sweetalert2";

function AddRewardsForm() {
  const [formData, setFormData] = useState({
    name: "",
    pointsRequired: "",
    benefits: "",
    category: "", // Added category field
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        pointsRequired: parseInt(formData.pointsRequired),
        benefits: formData.benefits.split(",").map((benefit) => benefit.trim()),
        category: formData.category,
        description: formData.description,
        isActive: true,
      };

      console.log("Sending payload:", payload);

      const response = await axios.post(
        "http://localhost:3001/api/addrewards",
        payload
      );

      if (response.status === 200 || response.status === 201) {
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Reward added successfully!",
          confirmButtonColor: "#115e59",
        });

        // Reset form after successful submission
        setFormData({
          name: "",
          pointsRequired: "",
          benefits: "",
          category: "",
          description: "",
        });

        // Navigate after form reset
        navigate("/membershipadmin");
      }
    } catch (error) {
      console.error("Error adding reward:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Failed to add reward. Please try again.",
        confirmButtonColor: "#115e59",
      });
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "All entered data will be lost!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#115e59",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, cancel",
      cancelButtonText: "No, keep editing",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/membershipadmin");
      }
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-2xl mx-auto mb-6">
        <button
          onClick={() => navigate("/membershipadmin")}
          className="flex items-center text-gray-600 hover:text-teal-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Membership Management
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg mx-auto">
        <h2 className="text-teal-900 text-2xl font-bold mb-6 text-center">
          Add Reward
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-teal-900 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-900"
              required
            />
          </div>

          <div>
            <label className="block text-teal-900 font-medium">
              Points Required
            </label>
            <input
              type="number"
              name="pointsRequired"
              value={formData.pointsRequired}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-900"
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-teal-900 font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-900"
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
            <label className="block text-teal-900 font-medium">
              Benefits (comma-separated)
            </label>
            <textarea
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-900"
              rows="2"
              placeholder="e.g. Free coffee, 10% discount, etc."
              required
            />
          </div>

          <div>
            <label className="block text-teal-900 font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-900"
              rows="3"
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full py-3 px-4 rounded-lg bg-gray-400 text-white hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full bg-teal-900 text-white py-3 rounded-lg hover:bg-teal-800 transition-colors"
            >
              Add Reward
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRewardsForm;
