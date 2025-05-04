import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddPackageForm() {
  const [formData, setFormData] = useState({
    name: "",
    monthlyCost: "",
    pointsPerDollar: "",
    benefits: "",
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        monthlyCost: parseFloat(formData.monthlyCost),
        pointsPerDollar: parseFloat(formData.pointsPerDollar),
        benefits: formData.benefits.split(",").map((b) => b.trim()),
      };

      const res = await axios.post("http://localhost:3001/api/addpkg", payload);

      Swal.fire({
        icon: "success",
        title: "Package added successfully!",
        text: res.data.message || "The package has been added.",
        confirmButtonColor: "#3085d6",
      });

      // Clear form
      setFormData({
        name: "",
        monthlyCost: "",
        pointsPerDollar: "",
        benefits: "",
        description: "",
        category: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.error ||
          "An error occurred while adding the package.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-800">
          Add Membership Package
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {[
            "name",
            "monthlyCost",
            "pointsPerDollar",
            "benefits",
            "description",
          ].map((field) => (
            <div key={field}>
              <label className="block mb-1 font-medium capitalize text-gray-700">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              {field === "benefits" || field === "description" ? (
                <textarea
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  rows={3}
                  required
                />
              ) : (
                <input
                  type={
                    field.includes("Cost") || field.includes("Points")
                      ? "number"
                      : "text"
                  }
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              )}
            </div>
          ))}

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
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

          <button
            type="submit"
            className="w-full bg-teal-800 text-white py-3 rounded-lg hover:bg-teal-700 transition"
          >
            Submit Package
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPackageForm;
