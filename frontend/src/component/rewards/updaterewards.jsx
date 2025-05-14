import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

function UpdateRewardsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    pointsRequired: "",
    benefits: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    const fetchReward = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/rewards/${id}`
        );
        const reward = response.data;

        setFormData({
          name: reward.name,
          pointsRequired: reward.pointsRequired,
          benefits: reward.benefits.join(", "),
          category: reward.category,
          description: reward.description || "",
        });
      } catch (error) {
        console.error("Error fetching reward:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch reward details",
          confirmButtonColor: "#115e59",
        });
      }
    };

    fetchReward();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        pointsRequired: parseInt(formData.pointsRequired),
        benefits: formData.benefits.split(",").map((b) => b.trim()),
        category: formData.category,
        description: formData.description,
        isActive: true,
      };

      await axios.put(`http://localhost:3001/api/rewards/${id}`, payload);

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Reward updated successfully",
        confirmButtonColor: "#115e59",
      });

      navigate("/membershipadmin");
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to update reward",
        confirmButtonColor: "#115e59",
      });
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Any unsaved changes will be lost!",
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
      <div className="max-w-lg mx-auto mb-6">
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
          Update Reward
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
              Update Reward
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateRewardsForm;
