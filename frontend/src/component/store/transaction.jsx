import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Loader2, Plus, Trash2 } from "lucide-react";

const Transaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [userError, setUserError] = useState("");
  const [availableItems, setAvailableItems] = useState([]);
  const [pkgDetails, setPkgDetails] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState({
    user: false,
    items: false,
    packages: false,
    transaction: false,
    shop: false,
  });
  const [shop, setShop] = useState(null);
  const [error, setError] = useState("");

  // Fetch available items for the shop
  useEffect(() => {
    const fetchItems = async () => {
      setLoading((prev) => ({ ...prev, items: true }));
      try {
        const response = await fetch(
          `http://localhost:3001/api/shop/${id}/items`
        );

        if (!response.ok) throw new Error("Failed to fetch items");
        const data = await response.json();
        setAvailableItems(data);
        if (data.length > 0) setSelectedItem(data[0]._id);
      } catch (error) {
        console.error("Error fetching items:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load menu items",
          confirmButtonColor: "#0D9488",
        });
      } finally {
        setLoading((prev) => ({ ...prev, items: false }));
      }
    };
    fetchItems();
  }, [id]);

  useEffect(() => {
    const fetchShopDetails = async () => {
      setLoading((prev) => ({ ...prev, shop: true }));
      try {
        const response = await fetch(`http://localhost:3001/api/shop/${id}`);
        if (!response.ok) throw new Error("Failed to fetch shop details");
        const data = await response.json();
        setShop(data);
      } catch (error) {
        console.error("Error fetching shop:", error);
        setError("Failed to load shop details");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load shop details",
          confirmButtonColor: "#0D9488",
        });
      } finally {
        setLoading((prev) => ({ ...prev, shop: false }));
      }
    };

    fetchShopDetails();
  }, [id]);

  const handleFetchUser = async () => {
    if (!username.trim()) return;

    setLoading((prev) => ({ ...prev, user: true }));
    try {
      const response = await fetch(
        `http://localhost:3001/api/details/${username.trim()}`
      );
      if (!response.ok) throw new Error("User not found");

      const data = await response.json();
      setUserDetails(data);
      setUserError("");

      if (data.membershipPackage && data.membershipPackage.length > 0) {
        setPkgDetails(data.membershipPackage);
      } else {
        setPkgDetails([]);
      }
    } catch (err) {
      setUserDetails(null);
      setUserError("User not found");
      setPkgDetails([]);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
        confirmButtonColor: "#0D9488",
      });
    } finally {
      setLoading((prev) => ({ ...prev, user: false }));
    }
  };

  const handleAddItem = () => {
    const itemData = availableItems.find((item) => item._id === selectedItem);
    if (!itemData || qty <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Quantity",
        text: "Please enter a valid quantity",
        confirmButtonColor: "#0D9488",
      });
      return;
    }

    const existingIndex = items.findIndex((item) => item._id === selectedItem);
    if (existingIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[existingIndex].qty += qty;
      setItems(updatedItems);
    } else {
      setItems([
        ...items,
        {
          _id: itemData._id,
          name: itemData.name,
          qty,
          price: itemData.price,
          imageFileName: itemData.imageFileName,
        },
      ]);
    }

    setQty(1);
  };

  const handleRemoveItem = (itemId) => {
    setItems(items.filter((item) => item._id !== itemId));
  };

  const getTotal = () =>
    items.reduce((sum, item) => sum + item.qty * item.price, 0);

  const getDiscountedTotal = () => {
    const subtotal = getTotal();

    // If no user or no packages, return original total
    if (!userDetails || !pkgDetails.length || !shop) return subtotal;

    // Find matching package with highest discount for the shop category
    const matchingPackage = getMatchingPackage();

    // Apply discount if matching package found
    if (matchingPackage) {
      const discount = (subtotal * matchingPackage.discount) / 100;
      return subtotal - discount;
    }

    return subtotal;
  };

  const calculatePoints = () => {
    if (!pkgDetails.length || !userDetails) return 0;

    const total = getDiscountedTotal();
    const highestPackage = pkgDetails.reduce((prev, current) =>
      current.pointsPerDollar > prev.pointsPerDollar ? current : prev
    );

    return Math.floor(total * highestPackage.pointsPerDollar);
  };

  const getMatchingPackage = () => {
    if (!pkgDetails.length || !shop) return null;
    return pkgDetails.reduce((highest, pkg) => {
      const categoryMatches =
        pkg.category === shop.category || pkg.category === "all";
      if (categoryMatches && (!highest || pkg.discount > highest.discount)) {
        return pkg;
      }
      return highest;
    }, null);
  };

  const handleConfirm = async () => {
    if (!userDetails) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select a user first",
        confirmButtonColor: "#0D9488",
      });
      return;
    }

    if (items.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please add at least one item",
        confirmButtonColor: "#0D9488",
      });
      return;
    }

    setLoading((prev) => ({ ...prev, transaction: true }));
    try {
      const transactionData = {
        userId: userDetails.id,
        shopId: id,
        items: items.map((item) => ({
          itemId: item._id,
          quantity: item.qty,
          price: item.price,
        })),

        totalAmount: getTotal(),
        pointsEarned: calculatePoints(),
        appliedDiscount: getTotal() - getDiscountedTotal(),
        discountAddedPackage: getMatchingPackage()?.packagename || null,
        finalTotal: getDiscountedTotal(),
      };
      console.log(`transaction data`, transactionData);

      const response = await fetch("http://localhost:3001/api/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) throw new Error("Failed to process transaction");

      const result = await response.json();

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `Transaction completed. Points earned: ${calculatePoints()}`,
        confirmButtonColor: "#0D9488",
      });

      // Reset form
      setItems([]);
      setUsername("");
      setUserDetails(null);
      setPkgDetails([]);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
        confirmButtonColor: "#0D9488",
      });
    } finally {
      setLoading((prev) => ({ ...prev, transaction: false }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm rounded-lg mb-6 p-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-teal-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Shop
          </button>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/transactionhistory")}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
            >
              View History
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">
          Transaction Processing
        </h2>

        {/* User Section */}
        <div className="mb-8 p-4 border rounded-lg bg-gray-50">
          <div className="flex items-end gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">
                Customer Username
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleFetchUser()}
                />
                <button
                  onClick={handleFetchUser}
                  disabled={loading.user || !username.trim()}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading.user ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Search"
                  )}
                </button>
              </div>
              {userError && (
                <p className="text-red-500 text-sm mt-2">{userError}</p>
              )}
            </div>
          </div>

          {userDetails && (
            <div className="mt-4 p-4 border rounded-lg bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-lg text-teal-700 mb-2">
                    Customer Details
                  </h3>
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {userDetails.name}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {userDetails.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {userDetails.phoneNumber}
                  </p>
                  <p>
                    <span className="font-medium">Current Points:</span>{" "}
                    {userDetails.points || 0}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-teal-700 mb-2">
                    Membership Benefits
                  </h3>
                  {pkgDetails.length > 0 ? (
                    pkgDetails.map((pkg, index) => (
                      <div
                        key={index}
                        className="mb-3 p-3 border rounded-lg bg-teal-50"
                      >
                        <p className="font-semibold text-teal-800">
                          {pkg.packagename}
                        </p>
                        <p className="text-sm text-gray-600">
                          Discount: {pkg.discount}%
                        </p>
                        <p className="text-sm text-gray-600">
                          {pkg.pointsPerDollar} points per $. 1 spent
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Activated on:{" "}
                          {new Date(pkg.activatedate).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No active memberships</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Section */}
        <div className="mb-8 p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold text-lg text-gray-800 mb-4">
            Order Details
          </h3>

          {/* Add Item */}
          <div className="flex flex-col md:flex-row gap-4 items-end mb-6">
            <div className="flex-1 w-full">
              <label className="block text-gray-700 mb-1">Select Item</label>
              {loading.items ? (
                <div className="flex justify-center py-2">
                  <Loader2 className="w-5 h-5 animate-spin text-teal-600" />
                </div>
              ) : (
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  disabled={availableItems.length === 0}
                >
                  {availableItems.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name} ($. {item.price.toFixed(2)})
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="w-full md:w-24">
              <label className="block text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                step="1"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                value={qty}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setQty(isNaN(val) ? 1 : Math.max(1, val));
                }}
              />
            </div>
            <button
              onClick={handleAddItem}
              disabled={availableItems.length === 0}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto flex items-center justify-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>

          {/* Items Table */}
          {items.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-lg">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Item</th>
                    <th className="px-4 py-2 text-center">Qty</th>
                    <th className="px-4 py-2 text-right">Price</th>
                    <th className="px-4 py-2 text-right">Total</th>
                    <th className="px-4 py-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  {items.map((item, idx) => (
                    <tr key={idx} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2 flex items-center gap-2">
                        {item.imageFileName && (
                          <img
                            src={`http://localhost:3001/uploads/${item.imageFileName}`}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/placeholder-item.png";
                            }}
                          />
                        )}
                        {item.name}
                      </td>
                      <td className="px-4 py-2 text-center">{item.qty}</td>
                      <td className="px-4 py-2 text-right">
                        $. {item.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-right">
                        $. {(item.qty * item.price).toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 border rounded-lg bg-white">
              No items added to the order yet
            </div>
          )}

          {items.length > 0 && (
            <div className="mt-6 p-4 border rounded-lg bg-white space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Subtotal:</span>
                <span>$. {getTotal().toFixed(2)}</span>
              </div>

              {userDetails && pkgDetails.length > 0 && shop && (
                <>
                  {/* Package Status Section */}
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Available Package:</span>
                    <span
                      className={
                        getMatchingPackage()
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      {getMatchingPackage()
                        ? `${getMatchingPackage().packagename} (${
                            getMatchingPackage().discount
                          }% off)`
                        : "No matching package for this shop category"}
                    </span>
                  </div>

                  {getMatchingPackage() && (
                    <div className="flex justify-between items-center text-green-600">
                      <span className="font-medium">Discount Applied:</span>
                      <span>
                        $. {(getTotal() - getDiscountedTotal()).toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center font-semibold text-lg border-t pt-2">
                    <span>Final Total:</span>
                    <span>$. {getDiscountedTotal().toFixed(2)}</span>
                  </div>

                  {getMatchingPackage() && (
                    <div className="flex justify-between items-center text-teal-700">
                      <span className="font-medium">Points to Earn:</span>
                      <span className="font-semibold">{calculatePoints()}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Confirm Button */}
        <div className="flex justify-end">
          <button
            onClick={handleConfirm}
            disabled={items.length === 0 || loading.transaction}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading.transaction ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm Transaction"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
