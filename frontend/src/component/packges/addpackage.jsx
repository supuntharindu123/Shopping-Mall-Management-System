import React, { useState } from "react";
import axios from "axios";

function MembershipPackageCard() {
  const [formData, setFormData] = useState({
    name: "",
    monthlyCost: "",
    pointsPerDollar: "",
    benefits: "",
    description: "",
    category: "",
  });

  const [alert, setAlert] = useState({ type: "", message: "" });
  const [showAlert, setShowAlert] = useState(false);

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

      if (res.data?.message === "Package added successfully") {
        setAlert({ type: "success", message: "Package added successfully" });
      } else {
        setAlert({
          type: "warning",
          message: "Unexpected response: " + res.data.message,
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "Error: " + (error.response?.data?.error || error.message),
      });
    }

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-teal-900 text-2xl font-bold mb-6 text-center">
          Add Packages
        </h2>

        {/* Custom Alert */}
        {showAlert && (
          <div
            className={`p-3 rounded-lg mb-4 text-white text-center ${
              alert.type === "success"
                ? "bg-green-600"
                : alert.type === "error"
                ? "bg-red-600"
                : "bg-yellow-500"
            }`}
          >
            {alert.message}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {[
            "name",
            "monthlyCost",
            "pointsPerDollar",
            "benefits",
            "description",
          ].map((field) => (
            <div key={field}>
              <label className="block text-teal-900 font-medium capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              {field === "description" || field === "benefits" ? (
                <textarea
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-900"
                  rows="3"
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
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-900"
                />
              )}
            </div>
          ))}

          <div>
            <label className="block text-teal-900 font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-900"
            >
              <option value="">Select Category</option>
              <option value="food">Food</option>
              <option value="fashion">Fashion</option>
              <option value="lifestyle">LifeStyle</option>
              <option value="entertainment">Entertainment</option>
              <option value="all">All</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-900 text-white p-3 rounded-lg hover:bg-gray-400 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default MembershipPackageCard;
