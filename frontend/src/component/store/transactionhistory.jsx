import React, { useState, useEffect } from "react";
import {
  Loader2,
  ChevronLeft,
  Package,
  Store,
  DollarSign,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userMap, setUserMap] = useState({});
  const [shopMap, setShopMap] = useState({});
  const [itemMap, setItemMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/transactions");
        if (!response.ok) throw new Error("Failed to fetch transactions");
        const data = await response.json();
        setTransactions(data);

        const userIds = [...new Set(data.map((t) => t.userId))];
        const shopIds = [...new Set(data.map((t) => t.shopId))];
        const itemIds = [
          ...new Set(data.flatMap((t) => t.items.map((i) => i.itemId))),
        ];

        // Fetch user details
        const userResponses = await Promise.all(
          userIds.map(async (id) => {
            const res = await fetch(`http://localhost:3001/api/user/${id}`);
            if (!res.ok) throw new Error(`Failed to fetch user ${id}`);
            return res.json();
          })
        );

        // Fetch shop details
        const shopResponses = await Promise.all(
          shopIds.map(async (id) => {
            const res = await fetch(`http://localhost:3001/api/shop/${id}`);
            if (!res.ok) throw new Error(`Failed to fetch shop ${id}`);
            return res.json();
          })
        );

        // Fetch item details
        const itemResponses = await Promise.all(
          itemIds.map(async (id) => {
            const res = await fetch(`http://localhost:3001/api/items/${id}`);
            if (!res.ok) throw new Error(`Failed to fetch item ${id}`);
            return res.json();
          })
        );

        // Create maps with error handling
        const userMap = {};
        const shopMap = {};
        const itemMap = {};

        userResponses.forEach((user) => {
          if (user && user._id) {
            userMap[user._id] = user.name || "Unknown User";
          }
        });

        shopResponses.forEach((shop) => {
          if (shop && shop._id) {
            shopMap[shop._id] = shop.shopName || "Unknown Shop";
          }
        });

        itemResponses.forEach((item) => {
          if (item && item._id) {
            itemMap[item._id] = item.name || "Unknown Item";
          }
        });

        setUserMap(userMap);
        setShopMap(shopMap);
        setItemMap(itemMap);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 p-4">Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-6 px-4">
      {/* Navigation */}
      <nav className="bg-white shadow-sm rounded-lg mb-6 p-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-teal-600"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </button>
      </nav>

      {/* Content */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <Store className="w-6 h-6" />
          Transaction History
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Transaction Date</th>
                <th className="py-3 px-4 text-left">Customer</th>
                <th className="py-3 px-4 text-left">Shop</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-center">Package Used</th>
                <th className="py-3 px-4 text-right">Discount</th>
                <th className="py-3 px-4 text-right">Final Amount</th>
                <th className="py-3 px-4 text-center">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <React.Fragment key={transaction._id}>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">
                      {formatDate(transaction.createdAt)}
                    </td>
                    <td className="py-3 px-4">
                      {userMap[transaction.userId] || "Unknown"}
                    </td>
                    <td className="py-3 px-4">
                      {shopMap[transaction.shopId] || "Unknown"}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        {transaction.totalAmount?.toFixed(2)}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {transaction.discountAddedPackage ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
                          <Package className="w-4 h-4 mr-1" />
                          {transaction.discountAddedPackage}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right text-green-600">
                      {transaction.appliedDiscount > 0
                        ? `- $${transaction.appliedDiscount.toFixed(2)}`
                        : "-"}
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      <div className="flex items-center justify-end gap-1">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        {transaction.finalTotal?.toFixed(2)}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center text-teal-600 font-medium">
                        <Award className="w-4 h-4 mr-1" />
                        {transaction.pointsEarned}
                      </span>
                    </td>
                  </tr>

                  {/* Items Row */}
                  <tr className="bg-gray-50">
                    <td colSpan={8} className="px-6 pb-4">
                      <div className="mt-2">
                        <h4 className="font-medium text-sm text-gray-700 mb-2">
                          Items
                        </h4>
                        <table className="min-w-full text-sm border border-gray-200 rounded-md">
                          <thead className="bg-gray-100 text-gray-700">
                            <tr>
                              <th className="py-2 px-3 text-left border-b">
                                Item
                              </th>
                              <th className="py-2 px-3 text-center border-b">
                                Quantity
                              </th>
                              <th className="py-2 px-3 text-right border-b">
                                Price
                              </th>
                              <th className="py-2 px-3 text-right border-b">
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {transaction.items.map((item) => (
                              <tr
                                key={item._id}
                                className="border-b hover:bg-gray-100"
                              >
                                <td className="py-2 px-3">
                                  <div className="flex items-center gap-2">
                                    {item.imageUrl && (
                                      <img
                                        src={`http://localhost:3001/uploads/${item.imageUrl}`}
                                        alt="item"
                                        className="w-8 h-8 object-cover rounded"
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src =
                                            "/placeholder-item.png";
                                        }}
                                      />
                                    )}
                                    <span>
                                      {itemMap[item.itemId] || "Unknown Item"}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-2 px-3 text-center">
                                  {item.quantity}
                                </td>
                                <td className="py-2 px-3 text-right">
                                  ${item.price?.toFixed(2)}
                                </td>
                                <td className="py-2 px-3 text-right">
                                  ${(item.quantity * item.price).toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
