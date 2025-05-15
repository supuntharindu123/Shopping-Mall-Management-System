import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  BarChart2,
  PieChart,
  DollarSign,
  Calendar,
  User,
  Tag,
  ChevronDown,
  Plus,
  Edit,
  Award,
  X,
} from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

const MembershipAdmin = () => {
  const [packagesection, setPackagesection] = useState(true);
  const [rewardsection, setRewardSection] = useState(false);
  const [packageList, setPackageList] = useState([]);
  const [rewardList, setRewardList] = useState([]);
  const [rewardHistory, setRewardHistory] = useState([]);
  const [showRewardHistory, setShowRewardHistory] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [packagesRes, rewardsRes, historyRes] = await Promise.all([
          axios.get("http://localhost:3001/api/pkg"),
          axios.get("http://localhost:3001/api/rewards"),
          axios.get("http://localhost:3001/api/rewards/history"),
        ]);

        setPackageList(packagesRes.data);
        setRewardList(rewardsRes.data);
        setRewardHistory(historyRes.data.redemptions || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch data",
          confirmButtonColor: "#115e59",
        });
      }
    };

    fetchData();
  }, []);

  const downloadReport = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/package/report", {
        responseType: "blob",
      });

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "membership_report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download error", err);
    }
  };

  const removepkg = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Delete Package?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#115e59",
        cancelButtonColor: "#dc2626",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          try {
            const res = await axios.delete(
              `http://localhost:3001/api/packages/${id}`
            );
            return res;
          } catch (error) {
            Swal.showValidationMessage(
              `Request failed: ${error.response.data.message || error.message}`
            );
          }
        },
      });

      if (result.isConfirmed) {
        setPackageList(packageList.filter((pkg) => pkg._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Package has been deleted successfully.",
          icon: "success",
          confirmButtonColor: "#115e59",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to delete package",
        icon: "error",
        confirmButtonColor: "#115e59",
      });
    }
  };

  const removeReward = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Delete Reward?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#115e59",
        cancelButtonColor: "#dc2626",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          try {
            await axios.delete(`http://localhost:3001/api/rewards/${id}`);
            return true;
          } catch (error) {
            Swal.showValidationMessage(
              `Request failed: ${
                error.response?.data?.message || error.message
              }`
            );
          }
        },
      });

      if (result.isConfirmed) {
        setRewardList(rewardList.filter((reward) => reward._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Reward has been deleted successfully.",
          icon: "success",
          confirmButtonColor: "#115e59",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to delete reward",
        icon: "error",
        confirmButtonColor: "#115e59",
      });
    }
  };

  const handleGenerateReport = async () => {
    try {
      await Swal.fire({
        title: "Generate Report",
        text: "Are you sure you want to generate a report?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#115e59",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Generate",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          return new Promise((resolve) => setTimeout(resolve, 1500));
        },
      });

      Swal.fire({
        title: "Success!",
        text: "Report has been generated successfully",
        icon: "success",
        confirmButtonColor: "#115e59",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to generate report",
        icon: "error",
        confirmButtonColor: "#115e59",
      });
    }
  };

  const handleSectionChange = async (section) => {
    const result = await Swal.fire({
      title: "Switch Section",
      text: "Are you sure you want to switch sections?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#115e59",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, switch",
      cancelButtonText: "Stay here",
    });

    if (result.isConfirmed) {
      if (section === "packages") {
        setPackagesection(true);
        setRewardSection(false);
      } else {
        setPackagesection(false);
        setRewardSection(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="bg-teal-900 text-white p-4 flex justify-between items-center mb-5">
        <div className="text-xl font-bold">Admin Dashboard</div>
        <div className="flex space-x-4">
          <a
            href="/admin"
            className="bg-teal-800 hover:bg-teal-700 px-4 py-2 rounded"
          >
            User Management
          </a>
          <a
            href="/adminshop"
            className="bg-teal-800 hover:bg-teal-700 px-4 py-2 rounded"
          >
            Shop Management
          </a>
          <a
            href="/parkingdashboard"
            className="bg-teal-800 hover:bg-teal-700 px-4 py-2 rounded"
          >
            Parking Management
          </a>
          <a
            href="/membershipadmin"
            className="bg-teal-90 hover:bg-teal-700 px-4 py-2 rounded"
          >
            Memberships
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-teal-900 mb-2">
              Admin Dashboard
            </h1>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={downloadReport}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
            >
              Generate Report
            </button>
          </div>
        </div>
        {/* Navigation */}
        <nav className="bg-white rounded-xl shadow-sm mb-8 overflow-hidden">
          <ul className="flex flex-col md:flex-row">
            <li className="border-b md:border-b-0 md:border-r border-gray-100">
              <button
                onClick={() => handleSectionChange("packages")}
                className="flex items-center gap-2 px-6 py-4 text-gray-600 font-medium hover:bg-teal-50 transition-colors"
              >
                <Tag size={18} />
                Packages
              </button>
            </li>
            <li className="border-b md:border-b-0 md:border-r border-gray-100">
              <button
                onClick={() => handleSectionChange("rewards")}
                className="flex items-center gap-2 px-6 py-4 text-gray-600 font-medium hover:bg-teal-50 transition-colors"
              >
                <PieChart size={18} />
                Rewards
              </button>
            </li>
          </ul>
        </nav>
        {packagesection && (
          <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-teal-900 text-2xl font-bold">
                Membership Packages
              </h1>
              <a
                href="/addpackage"
                className="bg-teal-900 text-white flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                <Plus size={16} /> Add Package
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {packageList.map((pkg, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  {/* Package Header */}
                  <div className="border-b pb-4 mb-4">
                    <h2 className="text-teal-900 text-2xl font-semibold mb-2">
                      {pkg.name}
                    </h2>
                    <span className="inline-block bg-teal-100 text-teal-800 text-sm px-3 py-1 rounded-full">
                      {pkg.category}
                    </span>
                  </div>

                  {/* Price and Points Section */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-teal-900">
                      <span className="text-3xl font-bold">
                        ${pkg.monthlyCost}
                      </span>
                      <span className="text-sm text-gray-600">/month</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Points per dollar</p>
                      <p className="text-lg font-semibold text-teal-700">
                        {pkg.pointsPerDollar} pts
                      </p>
                    </div>
                  </div>

                  {/* Discount if available */}
                  {pkg.discount > 0 && (
                    <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg mb-4 flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span>{pkg.discount}% discount on purchases</span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-gray-600 mb-4">{pkg.description}</p>

                  {/* Benefits Section */}
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Package Benefits
                    </h3>
                    <ul className="space-y-2">
                      {pkg.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <svg
                            className="w-4 h-4 text-teal-500 mt-1 mr-2 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                    <a
                      href={`/updatepackage/${pkg._id}`}
                      className="text-teal-600 hover:text-teal-800 p-2 rounded-full hover:bg-teal-50"
                      title="Edit Package"
                    >
                      <Edit size={18} />
                    </a>
                    <button
                      className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50"
                      onClick={() => removepkg(pkg._id)}
                      title="Delete Package"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        ,
        {rewardsection && (
          <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-teal-900 text-2xl font-bold">Rewards</h1>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowRewardHistory(true)}
                  className="bg-teal-100 text-teal-800 flex items-center gap-2 px-4 py-2 rounded-md hover:bg-teal-200 transition-colors"
                >
                  <Calendar size={16} /> View History
                </button>
                <Link
                  to="/addrewards"
                  className="bg-teal-900 text-white flex items-center gap-2 px-4 py-2 rounded-md hover:bg-teal-800 transition-colors"
                >
                  <Plus size={16} /> Add Reward
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewardList.map((reward) => (
                <div
                  key={reward._id}
                  className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-teal-900 text-xl font-semibold mb-2">
                        {reward.name}
                      </h2>
                      <p className="text-gray-500">
                        Package: {reward.packagename}
                      </p>
                    </div>
                    <span className="inline-flex items-center bg-teal-100 text-teal-800 text-sm px-3 py-1 rounded-full">
                      <Award className="w-4 h-4 mr-1" />
                      {reward.pointsRequired} pts
                    </span>
                  </div>

                  {reward.benefits && reward.benefits.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">
                        Benefits
                      </h3>
                      <ul className="space-y-1">
                        {reward.benefits.map((benefit, i) => (
                          <li
                            key={i}
                            className="text-gray-600 text-sm flex items-center"
                          >
                            <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {reward.description && (
                    <p className="text-gray-600 text-sm mt-4 border-t pt-4">
                      {reward.description}
                    </p>
                  )}

                  <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                    <Link
                      to={`/updaterewards/${reward._id}`}
                      className="text-teal-600 hover:text-teal-800 p-2 rounded-full hover:bg-teal-50"
                      title="Edit Reward"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => removeReward(reward._id)}
                      className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50"
                      title="Delete Reward"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Add Reward History Modal */}
            {showRewardHistory && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
                  <div className="p-6 flex justify-between items-center border-b">
                    <h2 className="text-2xl font-bold text-teal-900">
                      Reward Redemption History
                    </h2>
                    <button
                      onClick={() => setShowRewardHistory(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="p-6 overflow-auto max-h-[60vh]">
                    {rewardHistory.length > 0 ? (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              User
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Reward
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Shop
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Points Used
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {rewardHistory.map((history) => (
                            <tr key={history._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {history.username}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm text-gray-900">
                                  {history.rewardDetails.rewardName}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {history.rewardDetails.category}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {history.shopDetails?.shopName || "N/A"}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-teal-100 text-teal-800">
                                  {history.rewardDetails.pointsRequired} pts
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(
                                  history.redeemedAt
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Award className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                        <p>No reward redemption history available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MembershipAdmin;
