import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddTransaction = () => {
  const [formData, setFormData] = useState({
    username: "",
    category: "",
    totalamount: "",
  });
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.username.length > 3) {
      fetchUserDetails(formData.username);
    }
  }, [formData.username]);

  useEffect(() => {
    if (formData.totalamount && userDetails?.package?.discountPercentage) {
      calculateDiscount();
    }
  }, [formData.totalamount, userDetails]);

  const fetchUserDetails = async (username) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/api/details/${username}`
      );
      if (response.ok) {
        const data = await response.json();
        setUserDetails(data);
      } else {
        setUserDetails(null);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDiscount = () => {
    const discountPercentage = userDetails.package.discountPercentage;
    const total = parseFloat(formData.totalamount);
    const discountValue = (total * discountPercentage) / 100;
    setDiscount(discountValue);
    setFinalAmount(total - discountValue);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transactionData = {
        ...formData,
        discount: discount,
        amount: finalAmount,
      };

      const response = await fetch("http://localhost:3001/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
      });

      if (response.ok) {
        alert("Transaction added successfully!");
        navigate("/membershipadmin");
      } else {
        alert("Failed to add transaction.");
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/membershipadmin")}
          className="flex items-center gap-2 text-teal-600 mb-6 hover:underline"
        >
          ← Back to Transactions
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800">
              Add New Transaction
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* User Details Card */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-4 rounded-lg h-full">
                <h3 className="font-medium text-gray-700 mb-4">User Details</h3>

                {loading ? (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
                  </div>
                ) : userDetails ? (
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Username</p>
                      <p className="font-medium">{userDetails.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{userDetails.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Membership Package
                      </p>
                      <p className="font-medium capitalize">
                        {userDetails.membershipPackage.map((x) => {
                          return (
                            <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs capitalize">
                              {x.packagename}
                            </span>
                          );
                        }) || "None"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Points</p>
                      <p className="font-medium">{userDetails.points || 0}%</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    {formData.username
                      ? "User not found"
                      : "Enter username to see details"}
                  </p>
                )}
              </div>
            </div>

            {/* Transaction Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    required
                    placeholder="Enter username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="food">Food</option>
                    <option value="fashion">Fashion</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="lifestyle">Lifestyle</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Amount
                  </label>
                  <input
                    type="number"
                    name="totalamount"
                    value={formData.totalamount}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    required
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* Discount Calculation */}
                {formData.totalamount && userDetails?.package && (
                  <div className="bg-blue-50 p-4 rounded-md">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Original Amount</p>
                        <p className="font-medium">
                          ${parseFloat(formData.totalamount).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">
                          Discount ({userDetails.package.discountPercentage}%)
                        </p>
                        <p className="font-medium text-red-500">
                          -${discount.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Final Amount</p>
                        <p className="font-medium text-green-600">
                          ${finalAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-teal-900 hover:bg-teal-700 text-white py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out"
                  >
                    Add Transaction
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
