import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { redirect } from "react-router-dom";

const initialState = {
  name: "",
  monthlyCost: "",
  pointsPerDollar: "",
  benefits: "",
  description: "",
  category: "",
  discount: "", // Add discount field
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  ...props
}) => (
  <div>
    <label className="block mb-1 font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded-lg"
      required
      {...props}
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block mb-1 font-medium text-gray-700">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded-lg"
      rows={3}
      required
    />
  </div>
);

function AddPackageForm() {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const requiredFields = [
      "name",
      "monthlyCost",
      "pointsPerDollar",
      "benefits",
      "description",
      "category",
      "discount", // Add discount validation
    ];
    const emptyFields = requiredFields.filter((key) => !formData[key]);

    if (emptyFields.length > 0) {
      throw new Error(`Please fill in: ${emptyFields.join(", ")}`);
    }

    if (isNaN(formData.monthlyCost) || formData.monthlyCost <= 0) {
      throw new Error("Monthly Cost must be a positive number");
    }

    if (isNaN(formData.pointsPerDollar) || formData.pointsPerDollar <= 0) {
      throw new Error("Points Per Dollar must be a positive number");
    }

    if (
      isNaN(formData.discount) ||
      formData.discount < 0 ||
      formData.discount > 100
    ) {
      throw new Error("Discount must be between 0 and 100");
    }
  };

  const buildPayload = () => ({
    ...formData,
    monthlyCost: parseFloat(formData.monthlyCost),
    pointsPerDollar: parseFloat(formData.pointsPerDollar),
    discount: parseFloat(formData.discount),
    benefits: formData.benefits
      .split(",")
      .map((b) => b.trim())
      .filter(Boolean),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      validateForm();
      const payload = buildPayload();

      const res = await axios.post(
        "http://localhost:3001/api/addpkg",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      Swal.fire({ icon: "success", title: "Success!", text: res.data.message });
      setFormData(initialState);
      redirect("/membershipadmin");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || error.message,
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
          <InputField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="Monthly Cost"
            name="monthlyCost"
            value={formData.monthlyCost}
            onChange={handleChange}
            type="number"
          />
          <InputField
            label="Points Per Dollar"
            name="pointsPerDollar"
            value={formData.pointsPerDollar}
            onChange={handleChange}
            type="number"
          />
          <InputField
            label="Discount (%)"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            type="number"
            min="0"
            max="100"
          />
          <TextAreaField
            label="Benefits (comma-separated)"
            name="benefits"
            value={formData.benefits}
            onChange={handleChange}
          />
          <TextAreaField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
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
