import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
// Import the ChevronLeft icon
import { ChevronLeft } from "lucide-react";

function UpdateMembershipPackage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pkgname: "",
    monthlyCost: "",
    pointsPerDollar: "",
    benefits: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/pkgdetails/${id}`
        );
        const pkg = response.data;
        setFormData({
          pkgname: pkg.name,
          monthlyCost: pkg.monthlyCost,
          pointsPerDollar: pkg.pointsPerDollar,
          benefits: pkg.benefits.join(", "),
          description: pkg.description,
          category: pkg.category,
        });
      } catch (error) {
        console.error("Error fetching package:", error);
      }
    };

    fetchPackage();
  }, [id]);

  console.log("Form Data:", formData); // Debugging line

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Confirm Update",
      text: "Are you sure you want to update this package?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#115e59",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (result.isConfirmed) {
      try {
        const payload = {
          name: formData.pkgname,
          monthlyCost: parseFloat(formData.monthlyCost),
          pointsPerDollar: parseFloat(formData.pointsPerDollar),
          benefits: formData.benefits.split(",").map((b) => b.trim()),
          description: formData.description,
          category: formData.category,
        };

        await axios.put(`http://localhost:3001/api/packages/${id}`, payload);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Package updated successfully",
        });
        navigate("/membershipadmin");
      } catch (error) {
        console.error("Error updating package:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.message || "Failed to update package",
        });
      }
    }
  };

  // Add handleCancel function after handleSubmit
  const handleCancel = () => {
    Swal.fire({
      title: "Cancel Update?",
      text: "Your changes will not be saved!",
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
      {/* Back Navigation */}
      <div className="max-w-5xl mx-auto mb-6">
        <button
          onClick={() => navigate("/membershipadmin")}
          className="flex items-center text-gray-600 hover:text-teal-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Membership Management
        </button>
      </div>

      {/* Form Container */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg mx-auto">
        <h2 className="text-teal-900 text-2xl font-bold mb-6 text-center">
          Update Package
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-teal-900 font-medium">Name</label>
            <input
              type="text"
              name="pkgname"
              value={formData.pkgname}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-900"
            />
          </div>
          <div>
            <label className="block text-teal-900 font-medium">
              Monthly Cost
            </label>
            <input
              type="number"
              name="monthlyCost"
              value={formData.monthlyCost}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-900"
            />
          </div>
          <div>
            <label className="block text-teal-900 font-medium">
              Points Per Dollar
            </label>
            <input
              type="number"
              name="pointsPerDollar"
              value={formData.pointsPerDollar}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-900"
            />
          </div>
          <div>
            <label className="block text-teal-900 font-medium">Benefits</label>
            <textarea
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-900"
              rows="3"
            ></textarea>
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
            ></textarea>
          </div>
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

          {/* Update the buttons section */}
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full py-3 px-4 rounded-lg  bg-gray-400 text-white hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full bg-teal-900 text-white py-3 rounded-lg hover:bg-teal-800 transition-colors"
            >
              Update Package
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateMembershipPackage;
