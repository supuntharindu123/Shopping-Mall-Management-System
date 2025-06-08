import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiEdit,
  FiCamera,
  FiShoppingBag,
  FiAward,
  FiUser,
  FiChevronDown,
  FiChevronUp,
  FiX,
} from "react-icons/fi";
// Add to existing imports

import Swal from "sweetalert2";

const DEFAULT_PROFILE_PHOTO =
  "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

const UserProfile = () => {
  // Get user data from localStorage with proper error handling
  const [userData] = useState(() => {
    try {
      const data = localStorage.getItem("user");
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  });

  // Get userId from userData
  const [userId] = useState(() => {
    return userData?.id || null;
  });

  const [username] = useState(() => {
    return userData?.username || null;
  });

  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profilePhoto: "",
  });
  const [filePreview, setFilePreview] = useState("");
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [rewardsHistory, setRewardsHistory] = useState([]);
  const [showRewardsHistory, setShowRewardsHistory] = useState(false);
  const [parkingBookings, setParkingBookings] = useState([]);

  useEffect(() => {
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please log in to view your profile",
        confirmButtonColor: "#115e59",
      }).then(() => {
        window.location.href = "/login";
      });
    }
  }, [userId]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId || !userData?.token) return;

      try {
        const [userRes, transactionsRes, rewardsRes, parkingRes] =
          await Promise.all([
            axios.get(`http://localhost:3001/api/user/${userId}`, {
              headers: { Authorization: `Bearer ${userData.token}` },
            }),
            axios.get(`http://localhost:3001/api/transaction/${userId}`, {
              headers: { Authorization: `Bearer ${userData.token}` },
            }),
            axios.get(`http://localhost:3001/api/rewards`, {
              headers: { Authorization: `Bearer ${userData.token}` },
            }),
            axios.get(`http://localhost:3001/api/booking/${username}`, {
              headers: { Authorization: `Bearer ${userData.token}` },
            }),
          ]);

        const userInfo = userRes.data;
        const allRewards = rewardsRes.data;

        setUser({
          ...userInfo,
          recentTransactions: transactionsRes.data || [],
          allRewards: allRewards || [], // Add all rewards to user object
        });

        setParkingBookings(parkingRes.data.bookings || []);

        setFormData({
          name: userInfo.name,
          email: userInfo.email,
          phoneNumber: userInfo.phoneNumber,
          profilePhoto: userInfo.profilePhoto,
        });
        setFilePreview(userInfo.profilePhoto);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load profile data",
          confirmButtonColor: "#115e59",
        });
      }
    };

    fetchUserData();
  }, [userId, userData]);

  const fetchRewardsHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/rewards/history/${userId}`,
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );

      // Add console.log to debug the response
      console.log("Rewards history response:", response.data);

      // Check if the response contains the redemptions array
      if (response.data.success && response.data.redemptions) {
        setRewardsHistory(response.data.redemptions);
      } else {
        setRewardsHistory([]);
      }
    } catch (error) {
      console.error("Error fetching rewards history:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load rewards history",
        confirmButtonColor: "#115e59",
      });
      setRewardsHistory([]);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const formDataWithPhoto = new FormData();
      formDataWithPhoto.append("name", formData.name);
      formDataWithPhoto.append("email", formData.email);
      formDataWithPhoto.append("phoneNumber", formData.phoneNumber);

      if (formData.profilePhoto instanceof File) {
        formDataWithPhoto.append("profilePhoto", formData.profilePhoto);
      }

      const response = await axios.put(
        `http://localhost:3001/api/user/${userId}`,
        formDataWithPhoto,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );

      setUser({ ...user, ...response.data });
      setEditMode(false);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile updated successfully",
        confirmButtonColor: "#115e59",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update profile",
        confirmButtonColor: "#115e59",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleRedeemReward = (rewardId) => {
    console.log(`Redeeming reward with ID: ${rewardId}`);
    // Add logic for redeeming reward
  };

  const toggleRowExpansion = (transactionId) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(transactionId)) {
      newExpandedRows.delete(transactionId);
    } else {
      newExpandedRows.add(transactionId);
    }
    setExpandedRows(newExpandedRows);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-teal-900 text-white p-6 rounded-t-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="relative mr-4">
              {editMode ? (
                <div className="relative">
                  <img
                    src={
                      filePreview || user.profilePhoto || DEFAULT_PROFILE_PHOTO
                    }
                    alt="Profile"
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-white"
                  />
                  <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer">
                    <FiCamera className="text-teal-900" />
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                </div>
              ) : (
                <img
                  src={user.profilePhoto || DEFAULT_PROFILE_PHOTO}
                  alt="Profile"
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-white"
                />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-300">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-white text-teal-900 px-3 py-1 rounded-full text-sm font-semibold">
              {user.tier} Member
            </div>
            <div className="bg-white text-teal-900 px-3 py-1 rounded-full text-sm font-semibold">
              {user.points} pts
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-lg rounded-b-lg">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              className={`flex items-center px-6 py-3 font-medium ${
                activeTab === "profile"
                  ? "text-teal-900 border-b-2 border-teal-900"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <FiUser className="mr-2" /> Profile
            </button>
            <button
              className={`flex items-center px-6 py-3 font-medium ${
                activeTab === "transactions"
                  ? "text-teal-900 border-b-2 border-teal-900"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("transactions")}
            >
              <FiShoppingBag className="mr-2" /> Transactions
            </button>
            <button
              className={`flex items-center px-6 py-3 font-medium ${
                activeTab === "rewards"
                  ? "text-teal-900 border-b-2 border-teal-900"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("rewards")}
            >
              <FiAward className="mr-2" /> Rewards
            </button>
            <button
              className={`flex items-center px-6 py-3 font-medium ${
                activeTab === "parking"
                  ? "text-teal-900 border-b-2 border-teal-900"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("parking")}
            >
              Parking
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "profile" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-teal-900">
                    Profile Information
                  </h2>
                  {!editMode ? (
                    <button
                      onClick={handleEdit}
                      className="flex items-center bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                    >
                      <FiEdit className="mr-2" /> Edit Profile
                    </button>
                  ) : (
                    <button
                      onClick={handleSave}
                      className="bg-teal-900 text-white px-4 py-2 rounded-lg hover:bg-teal-800"
                    >
                      Save Changes
                    </button>
                  )}
                </div>

                {editMode ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-gray-500 text-sm">Full Name</h3>
                        <p className="text-gray-800">{user.name}</p>
                      </div>
                      <div>
                        <h3 className="text-gray-500 text-sm">Email</h3>
                        <p className="text-gray-800">{user.email}</p>
                      </div>
                      <div>
                        <h3 className="text-gray-500 text-sm">Phone Number</h3>
                        <p className="text-gray-800">{user.phoneNumber}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-gray-500 text-sm">
                          Membership Package
                        </h3>
                        <p className="text-gray-800">
                          {user.membershipPackage.map((x, index) => (
                            <span key={index}>
                              {x.packagename}
                              {index < user.membershipPackage.length - 1
                                ? ", "
                                : ""}
                            </span>
                          ))}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-gray-500 text-sm">Ponints</h3>
                        <p className="text-gray-800">{user.points}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Spending Goal Card */}
              </div>
            )}

            {activeTab === "transactions" && (
              <div>
                <h2 className="text-xl font-bold text-teal-900 mb-6">
                  Transaction History
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="w-10 px-6 py-3"></th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Store
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Amount
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Points Earned
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {user.recentTransactions.map((transaction) => (
                        <React.Fragment key={transaction._id}>
                          <tr
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => toggleRowExpansion(transaction._id)}
                          >
                            <td className="px-6 py-4">
                              {expandedRows.has(transaction._id) ? (
                                <FiChevronUp className="w-4 h-4 text-gray-500" />
                              ) : (
                                <FiChevronDown className="w-4 h-4 text-gray-500" />
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(transaction.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {transaction.shopName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                              ${transaction.finalTotal.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-teal-900 font-medium">
                              +{transaction.pointsEarned} pts
                            </td>
                          </tr>
                          {expandedRows.has(transaction._id) && (
                            <tr className="bg-gray-50">
                              <td colSpan="5" className="px-6 py-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-2">
                                      Items
                                    </h4>
                                    <div className="space-y-2">
                                      {transaction.items.map((item, index) => (
                                        <div
                                          key={index}
                                          className="flex justify-between text-sm"
                                        >
                                          <span className="text-gray-600">
                                            {item.quantity}x {item.itemName}
                                          </span>
                                          <span className="text-gray-900">
                                            $
                                            {(
                                              item.price * item.quantity
                                            ).toFixed(2)}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">
                                        Subtotal:
                                      </span>
                                      <span className="text-gray-900">
                                        ${transaction.totalAmount.toFixed(2)}
                                      </span>
                                    </div>
                                    {transaction.appliedDiscount > 0 && (
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">
                                          Discount (
                                          {transaction.discountAddedPackage}):
                                        </span>
                                        <span className="text-green-600">
                                          -$
                                          {transaction.appliedDiscount.toFixed(
                                            2
                                          )}
                                        </span>
                                      </div>
                                    )}
                                    <div className="flex justify-between text-sm font-medium pt-2 border-t">
                                      <span className="text-gray-900">
                                        Final Total:
                                      </span>
                                      <span className="text-gray-900">
                                        ${transaction.finalTotal.toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "rewards" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-teal-900">
                    Available Rewards
                  </h2>
                  <button
                    onClick={() => {
                      setShowRewardsHistory(true);
                      fetchRewardsHistory();
                    }}
                    className="flex items-center gap-2 bg-teal-100 text-teal-800 px-4 py-2 rounded-lg hover:bg-teal-200 transition-colors"
                  >
                    <FiAward /> View Redemption History
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {user.allRewards?.map((reward) => (
                    <div
                      key={reward._id}
                      className={`border rounded-lg p-4 ${
                        user.points >= reward.pointsRequired
                          ? "border-teal-900 bg-teal-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-teal-900">
                          {reward.name}
                        </h3>
                        <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                          {reward.category}
                        </span>
                      </div>

                      {reward.benefits && reward.benefits.length > 0 && (
                        <div className="mb-4">
                          <div className="text-sm text-gray-600 space-y-1">
                            {reward.benefits.map((benefit, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <span className="text-teal-500 mt-1">•</span>
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>{user.points} pts</span>
                          <span>{reward.pointsRequired} pts</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              user.points >= reward.pointsRequired
                                ? "bg-teal-600"
                                : "bg-gray-400"
                            }`}
                            style={{
                              width: `${Math.min(
                                100,
                                (user.points / reward.pointsRequired) * 100
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p
                          className={`text-sm ${
                            user.points >= reward.pointsRequired
                              ? "text-teal-900 font-medium"
                              : "text-gray-600"
                          }`}
                        >
                          {user.points >= reward.pointsRequired
                            ? "Ready to redeem!"
                            : `${
                                reward.pointsRequired - user.points
                              } more points needed`}
                        </p>
                        {user.points >= reward.pointsRequired && (
                          <button
                            className="mt-3 w-full bg-teal-900 text-white py-2 rounded-lg hover:bg-teal-800 transition-colors flex items-center justify-center gap-2"
                            onClick={() => handleRedeemReward(reward._id)}
                          >
                            <FiAward />
                            Redeem Now
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {(!user.allRewards || user.allRewards.length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    <FiAward className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                    <p>No rewards available at this time.</p>
                  </div>
                )}

                {showRewardsHistory && (
                  <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-teal-900">
                          Rewards History
                        </h3>
                        <button
                          onClick={() => setShowRewardsHistory(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          ✕
                        </button>
                      </div>

                      {Array.isArray(rewardsHistory) &&
                      rewardsHistory.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                          {rewardsHistory.map((redemption) => (
                            <div key={redemption._id} className="py-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="font-semibold text-teal-900">
                                    {redemption.rewardDetails?.rewardName ||
                                      "Unknown Reward"}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    Redeemed at:{" "}
                                    {new Date(
                                      redemption.redeemedAt
                                    ).toLocaleString()}
                                  </p>
                                </div>
                                <span className="text-sm bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                                  {redemption.rewardDetails?.category ||
                                    "No Category"}
                                </span>
                              </div>

                              <div className="bg-gray-50 rounded-lg p-3 mt-2">
                                <div className="text-sm">
                                  <p className="text-gray-600">
                                    Points Used:{" "}
                                    <span className="font-medium text-teal-900">
                                      {redemption.rewardDetails
                                        ?.pointsRequired || 0}{" "}
                                      pts
                                    </span>
                                  </p>
                                  {redemption.shopDetails && (
                                    <p className="text-gray-600">
                                      Redeemed at:{" "}
                                      <span className="font-medium text-teal-900">
                                        {redemption.shopDetails.shopName}
                                      </span>
                                    </p>
                                  )}
                                </div>
                                {redemption.rewardDetails?.benefits?.length >
                                  0 && (
                                  <div className="mt-2">
                                    <p className="text-sm text-gray-600 font-medium">
                                      Benefits:
                                    </p>
                                    <ul className="list-disc list-inside text-sm text-gray-600 pl-2">
                                      {redemption.rewardDetails.benefits.map(
                                        (benefit, index) => (
                                          <li key={index}>{benefit}</li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <FiAward className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                          <p>No rewards have been redeemed yet.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "parking" && (
              <div>
                <h2 className="text-xl font-bold text-teal-900 mb-6">
                  Parking History
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Booking Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          License Plate
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Spot
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Vehicle Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Arrival
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Departure
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {parkingBookings.map((booking) => (
                        <tr key={booking._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(booking.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {booking.licensePlate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.parkingSpot}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.vehicleType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(booking.arrivalTime).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(booking.departureTime).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${
                    booking.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : booking.status === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                            >
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {parkingBookings.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <FiCar className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                      <p>No parking bookings found</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
