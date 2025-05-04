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
} from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

const MembershipAdmin = () => {
  const rewards = [
    {
      name: "Free Coffee",
      pointsRequired: 50,
      category: "Food",
    },
    {
      name: "Discount Coupon",
      pointsRequired: 100,
      category: "Fashion",
    },
  ];

  const [transactions, setTransactions] = useState([]);
  const [totalSpending, setTotalSpending] = useState(0);
  const [categorySpending, setCategorySpending] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [expandedTransaction, setExpandedTransaction] = useState(null);
  const [transactionsection, setTransactionSection] = useState(true);
  const [packagesection, setPackagesection] = useState(false);
  const [rewardsection, setRewardSection] = useState(false);
  const [packageList, setPackageList] = useState([]);
  const [rewardList, setRewardList] = useState(rewards);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3001/api/transactions");
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data);

        let total = 0;
        const categoryTotals = {};

        data.forEach((transaction) => {
          total += transaction.amount;
          categoryTotals[transaction.category] =
            (categoryTotals[transaction.category] || 0) + transaction.amount;
        });

        setTotalSpending(total);
        setCategorySpending(categoryTotals);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const pkg = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/packages");
        setPackageList(res.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchTransactions();
    pkg();
  }, []);

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/transactions/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }
      setTransactions(
        transactions.filter((transaction) => transaction._id !== id)
      );
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const removeTransactions = async function (transactionId) {
    try {
      const response = await fetch(
        `http://localhost:3001/api/removetransaction/${transactionId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const response = await fetch("http://localhost:3001/api/transactions");
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data);
        alert("Transaction deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting transactions:", error);
    }
  };

  const removepkg = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#115e59",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const res = await axios.delete(
          `http://localhost:3001/api/packages/${id}`
        );
        if (res.status === 200) {
          Swal.fire("Deleted!", "Package has been deleted.", "success");
          // Refresh package list
          setPackageList(packageList.filter((pkg) => pkg._id !== id));
        }
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to delete package.", "error");
      console.error("Error deleting package:", error);
    }
  };

  const toggleExpandTransaction = (id) => {
    setExpandedTransaction(expandedTransaction === id ? null : id);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getCategoryColor = (category) => {
    const colors = {
      membership: "bg-indigo-100 text-indigo-800",
      package: "bg-purple-100 text-purple-800",
      reward: "bg-amber-100 text-amber-800",
      other: "bg-gray-100 text-gray-800",
    };
    return colors[category.toLowerCase()] || colors["other"];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-4 md:p-8">
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
            href="/store"
            className="bg-teal-800 hover:bg-teal-700 px-4 py-2 rounded"
          >
            Store Management
          </a>
          <a
            href="/parkingdashboard"
            className="bg-teal-800 hover:bg-teal-700 px-4 py-2 rounded"
          >
            Parking Management
          </a>
          <a
            href="/membershipadmin"
            className="bg-teal-800 hover:bg-teal-700 px-4 py-2 rounded"
          >
            Transaction
          </a>
          <a className="bg-teal-800 hover:bg-teal-700 px-4 py-2 rounded">
            Logout
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
            <p className="text-teal-700">
              Manage membership transactions and analytics
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
              Generate Report
            </button>
          </div>
        </div>
        {/* Navigation */}
        <nav className="bg-white rounded-xl shadow-sm mb-8 overflow-hidden">
          <ul className="flex flex-col md:flex-row">
            <li className="border-b md:border-b-0 md:border-r border-gray-100">
              <button
                onClick={() => {
                  setTransactionSection(true),
                    setPackagesection(false),
                    setRewardSection(false);
                }}
                className="flex items-center gap-2 px-6 py-4 text-teal-600 font-medium hover:bg-teal-50 transition-colors"
              >
                <DollarSign size={18} />
                Transactions
              </button>
            </li>
            <li className="border-b md:border-b-0 md:border-r border-gray-100">
              <button
                onClick={() => {
                  setTransactionSection(false),
                    setPackagesection(true),
                    setRewardSection(false);
                }}
                className="flex items-center gap-2 px-6 py-4 text-gray-600 font-medium hover:bg-teal-50 transition-colors"
              >
                <Tag size={18} />
                Packages
              </button>
            </li>
            <li className="border-b md:border-b-0 md:border-r border-gray-100">
              <button
                onClick={() => {
                  setTransactionSection(false),
                    setPackagesection(false),
                    setRewardSection(true);
                }}
                className="flex items-center gap-2 px-6 py-4 text-gray-600 font-medium hover:bg-teal-50 transition-colors"
              >
                <PieChart size={18} />
                Rewards
              </button>
            </li>
          </ul>
        </nav>
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-teal-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium">Total Spending</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-2">
                  ${totalSpending.toFixed(2)}
                </h3>
              </div>
              <div className="bg-teal-100 p-3 rounded-full">
                <DollarSign className="text-teal-600" size={24} />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">All-time transactions</p>
          </div>

          {Object.entries(categorySpending).map(([category, amount]) => (
            <div
              key={category}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-indigo-500"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 font-medium capitalize">
                    {category} Spending
                  </p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-2">
                    ${amount.toFixed(2)}
                  </h3>
                </div>
                <div className="bg-indigo-100 p-3 rounded-full">
                  <BarChart2 className="text-indigo-600" size={24} />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                {((amount / totalSpending) * 100).toFixed(1)}% of total
              </p>
            </div>
          ))}
        </div>
        {transactionsection && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="border-b border-gray-100">
              <Link
                to={"/addtransaction"}
                className="flex items-center gap-2 px-6 py-4 text-teal-600 font-medium hover:bg-teal-50 transition-colors w-full text-left"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add New Transaction
              </Link>
            </div>

            {/* Transaction List Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                  Recent Transactions
                </h2>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                    Filter
                  </button>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="p-8 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
              </div>
            ) : transactions.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {transactions.map((transaction) => (
                  <div
                    key={transaction._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className="grid grid-cols-2 md:grid-cols-6 gap-4 p-6 cursor-pointer"
                      onClick={() => toggleExpandTransaction(transaction._id)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`${getCategoryColor(
                            transaction.category
                          )} px-3 py-1 rounded-full text-xs font-medium`}
                        >
                          {transaction.category}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <User size={16} className="text-gray-400" />
                        {transaction.username}
                      </div>
                      <div className="hidden md:flex items-center gap-2 text-gray-700">
                        <Calendar size={16} className="text-gray-400" />
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                      <div className="text-right md:text-left font-medium">
                        ${transaction.amount.toFixed(2)}
                      </div>
                      <div className="hidden md:block text-gray-500 text-sm">
                        ${transaction.discount.toFixed(2)} discount
                      </div>
                      <div className="flex justify-end md:justify-start items-center">
                        <button
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeTransactions(transaction._id);
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                        <ChevronDown
                          size={18}
                          className={`ml-4 text-gray-400 transition-transform duration-200 ${
                            expandedTransaction === transaction._id
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </div>
                    </div>

                    {expandedTransaction === transaction._id && (
                      <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">
                            Transaction Details
                          </h4>
                          <div className="space-y-2">
                            <p className="text-sm">
                              <span className="text-gray-500">Date:</span>{" "}
                              {formatDate(transaction.date)}
                            </p>
                            <p className="text-sm">
                              <span className="text-gray-500">
                                Original Amount:
                              </span>{" "}
                              ${transaction.totalamount.toFixed(2)}
                            </p>
                            <p className="text-sm">
                              <span className="text-gray-500">
                                Discount Applied:
                              </span>{" "}
                              ${transaction.discount.toFixed(2)}
                            </p>
                            <p className="text-sm">
                              <span className="text-gray-500">
                                Final Amount:
                              </span>{" "}
                              ${transaction.amount.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">
                            User Information
                          </h4>
                          <div className="space-y-2">
                            <p className="text-sm">
                              <span className="text-gray-500">Username:</span>{" "}
                              {transaction.username}
                            </p>
                            <p className="text-sm">
                              <span className="text-gray-500">
                                Membership Level:
                              </span>{" "}
                              Premium
                            </p>
                            <p className="text-sm">
                              <span className="text-gray-500">
                                Last Activity:
                              </span>{" "}
                              2 days ago
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                No transactions found.{" "}
                <button
                  onClick={() => setTransactionSection(true)}
                  className="text-teal-600 hover:underline font-medium"
                >
                  Create your first transaction
                </button>{" "}
                to get started.
              </div>
            )}

            {/* Pagination */}
            <div className="p-4 border-t border-gray-100 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing 1 to {transactions.length} of {transactions.length}{" "}
                entries
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-100">
                  Previous
                </button>
                <button className="px-3 py-1 border border-gray-200 rounded-md bg-teal-600 text-white">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-100">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
        ,
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
                <div key={index} className="bg-white shadow-md rounded-xl p-4">
                  <h2 className="text-teal-900 text-xl font-semibold">
                    {pkg.name}
                  </h2>
                  <p className="text-gray-500">{pkg.description}</p>
                  <p className="text-teal-900 font-bold mt-2">
                    ${pkg.monthlyCost}/month
                  </p>
                  <ul className="text-gray-600 mt-2">
                    {pkg.benefits.map((benefit, i) => (
                      <li key={i} className="list-disc ml-5">
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-end gap-2 mt-4">
                    <a
                      href={`/updatepackage/${pkg._id}`}
                      className="text-gray-600 hover:text-teal-900"
                    >
                      <Edit size={18} />
                    </a>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => removepkg(pkg._id)}
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
              <a
                href="/addrewards"
                className="bg-teal-900 text-white flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                <Plus size={16} /> Add Reward
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewardList.map((reward, index) => (
                <div key={index} className="bg-white shadow-md rounded-xl p-4">
                  <h2 className="text-teal-900 text-xl font-semibold">
                    {reward.name}
                  </h2>
                  <p className="text-gray-500">Category: {reward.category}</p>
                  <p className="text-teal-900 font-bold mt-2">
                    Points Required: {reward.pointsRequired}
                  </p>
                  <div className="flex justify-end gap-2 mt-4">
                    <a
                      href="/updaterewards"
                      className="text-gray-600 hover:text-teal-900"
                    >
                      <Edit size={18} />
                    </a>
                    <a className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembershipAdmin;
