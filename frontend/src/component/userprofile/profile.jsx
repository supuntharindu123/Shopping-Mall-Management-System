import React, { useState, useEffect } from "react";
import {
  FiEdit,
  FiCamera,
  FiShoppingBag,
  FiAward,
  FiUser,
} from "react-icons/fi";

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    membershipPackage: "",
    profilePhoto: "",
  });
  const [filePreview, setFilePreview] = useState("");

  // Mock user data - replace with API calls in a real app
  useEffect(() => {
    const fetchUserData = async () => {
      // Simulate API call
      setTimeout(() => {
        const mockUser = {
          id: userId,
          name: "Alex Johnson",
          email: "alex.johnson@example.com",
          profilePhoto: "https://randomuser.me/api/portraits/women/44.jpg",
          membershipPackage: "Fashionista",
          joinDate: "January 15, 2023",
          points: 750,
          tier: "Gold",
          spendingGoal: {
            target: 200,
            current: 150,
            category: "Fashion",
            reward: "15% discount",
          },
          recentTransactions: [
            {
              id: 1,
              store: "Zara",
              category: "Fashion",
              amount: 120,
              date: "2023-05-10",
              pointsEarned: 240,
            },
            {
              id: 2,
              store: "Food Court",
              category: "Food",
              amount: 45,
              date: "2023-05-08",
              pointsEarned: 45,
            },
            {
              id: 3,
              store: "Cinema",
              category: "Entertainment",
              amount: 30,
              date: "2023-05-05",
              pointsEarned: 30,
            },
            {
              id: 4,
              store: "Sephora",
              category: "Lifestyle",
              amount: 85,
              date: "2023-05-03",
              pointsEarned: 85,
            },
            {
              id: 5,
              store: "H&M",
              category: "Fashion",
              amount: 65,
              date: "2023-05-01",
              pointsEarned: 130,
            },
          ],
          availableRewards: [
            {
              id: 1,
              name: "15% Fashion Discount",
              pointsRequired: 500,
              category: "Fashion",
            },
            {
              id: 2,
              name: "Free Movie Ticket",
              pointsRequired: 300,
              category: "Entertainment",
            },
            {
              id: 3,
              name: "Free Dessert",
              pointsRequired: 200,
              category: "Food",
            },
          ],
        };
        setUser(mockUser);
        setFormData({
          name: mockUser.name,
          email: mockUser.email,
          membershipPackage: mockUser.membershipPackage,
          profilePhoto: mockUser.profilePhoto,
        });
        setFilePreview(mockUser.profilePhoto);
      }, 500);
    };

    fetchUserData();
  }, [userId]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    // Here you would typically make an API call to update user data
    setUser({ ...user, ...formData, profilePhoto: filePreview });
    setEditMode(false);
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
                    src={filePreview || user.profilePhoto}
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
                  src={user.profilePhoto}
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
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Membership Package
                      </label>
                      <select
                        name="membershipPackage"
                        value={formData.membershipPackage}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="Foodie Delight">Foodie Delight</option>
                        <option value="Fashionista">Fashionista</option>
                        <option value="Entertainment Enthusiast">
                          Entertainment Enthusiast
                        </option>
                        <option value="Lifestyle Pro">Lifestyle Pro</option>
                        <option value="Mall Explorer Premium">
                          Mall Explorer Premium
                        </option>
                      </select>
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
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-gray-500 text-sm">
                          Membership Package
                        </h3>
                        <p className="text-gray-800">
                          {user.membershipPackage}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-gray-500 text-sm">Member Since</h3>
                        <p className="text-gray-800">{user.joinDate}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Spending Goal Card */}
                <div className="mt-8 bg-teal-50 border border-teal-100 rounded-lg p-4">
                  <h3 className="font-bold text-teal-900 mb-2">
                    Current Spending Goal
                  </h3>
                  <p className="mb-3">
                    Spend ${user.spendingGoal.target} on{" "}
                    {user.spendingGoal.category} to earn a{" "}
                    {user.spendingGoal.reward}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-teal-900 h-2.5 rounded-full"
                      style={{
                        width: `${
                          (user.spendingGoal.current /
                            user.spendingGoal.target) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    ${user.spendingGoal.current} of ${user.spendingGoal.target}{" "}
                    (${user.spendingGoal.target - user.spendingGoal.current} to
                    go)
                  </p>
                </div>
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Store
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Points Earned
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {user.recentTransactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(transaction.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {transaction.store}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                transaction.category === "Fashion"
                                  ? "bg-purple-100 text-purple-800"
                                  : transaction.category === "Food"
                                  ? "bg-green-100 text-green-800"
                                  : transaction.category === "Entertainment"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {transaction.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${transaction.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-900 font-medium">
                            +{transaction.pointsEarned} pts
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "rewards" && (
              <div>
                <h2 className="text-xl font-bold text-teal-900 mb-6">
                  Your Rewards
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {user.availableRewards.map((reward) => (
                    <div
                      key={reward.id}
                      className={`border rounded-lg p-4 ${
                        user.points >= reward.pointsRequired
                          ? "border-teal-900 bg-teal-50"
                          : "border-gray-200"
                      }`}
                    >
                      <h3 className="font-bold text-teal-900 mb-2">
                        {reward.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {reward.pointsRequired} points required •{" "}
                        {reward.category}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            user.points >= reward.pointsRequired
                              ? "bg-teal-900"
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
                      <p
                        className={`text-sm mt-2 ${
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
                        <button className="mt-3 w-full bg-teal-900 text-white py-2 rounded-lg hover:bg-teal-800">
                          Redeem Now
                        </button>
                      )}
                    </div>
                  ))}
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
