import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Transaction = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [userError, setUserError] = useState("");
  const [availableItems, setAvailableItems] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [qty, setQty] = useState(1);

  // Fetch available items for the shop
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/shop/${id}/items`
        );
        const data = await response.json();
        setAvailableItems(data);
        if (data.length > 0) setSelectedItem(data[0].name);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();

    const packageDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/pkgdetails/${id}`
        );
        const data = await response.json();
        setAvailableItems(data);
        if (data.length > 0) setSelectedItem(data[0].name);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
  }, [id]);

  // Fetch user details by username
  const handleFetchUser = async () => {
    if (!username) return;

    try {
      const response = await fetch(
        `http://localhost:3001/api/details/${username}`
      );
      if (!response.ok) throw new Error("User not found");

      const data = await response.json();
      setUserDetails(data);
      setUserError("");
    } catch (err) {
      setUserDetails(null);
      setUserError("User not found");
    }
  };

  const handleAddItem = () => {
    const itemData = availableItems.find((item) => item.name === selectedItem);
    if (!itemData || qty <= 0) return;

    const existingIndex = items.findIndex((item) => item.name === selectedItem);
    if (existingIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[existingIndex].qty += qty;
      setItems(updatedItems);
    } else {
      setItems([...items, { name: selectedItem, qty, price: itemData.price }]);
    }

    setQty(1);
  };

  const getTotal = () =>
    items.reduce((sum, item) => sum + item.qty * item.price, 0);

  const handleConfirm = () => {
    const data = {
      username,
      userDetails,
      items,
      total: getTotal(),
    };

    console.log("Transaction Data:", data);
    // Send to backend or process further
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Transaction Summary
      </h2>

      {/* Username */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Username</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={handleFetchUser}
        />
        {userError && <p className="text-red-500 text-sm mt-2">{userError}</p>}
        {userDetails && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <p>
              <strong>Name:</strong> {userDetails.name}
            </p>
            <p>
              <strong>Email:</strong> {userDetails.email}
            </p>
            <p>
              <strong>Membership Package:</strong>
              <br />
              {userDetails.membershipPackage.map((pkg, index) => (
                <span key={index} className="block text-teal-600">
                  {pkg.packagename}
                </span>
              ))}
            </p>
          </div>
        )}
      </div>

      {/* Add Item */}
      <div className="flex gap-4 items-end mb-6">
        <div className="flex-1">
          <label className="block text-gray-700 mb-1">Select Item</label>
          <select
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
          >
            {availableItems.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name} (Rs. {item.price})
              </option>
            ))}
          </select>
        </div>
        <div className="w-32">
          <label className="block text-gray-700 mb-1">Qty</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
            value={qty}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setQty(isNaN(val) ? 0 : val);
            }}
          />
        </div>
        <button
          onClick={handleAddItem}
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg transition"
        >
          Add Item
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Item</th>
              <th className="px-4 py-2 text-right">Qty</th>
              <th className="px-4 py-2 text-right">Price</th>
              <th className="px-4 py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {items.map((item, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2 text-right">{item.qty}</td>
                <td className="px-4 py-2 text-right">Rs. {item.price}</td>
                <td className="px-4 py-2 text-right">
                  Rs. {item.qty * item.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div className="mt-6 flex justify-end text-lg font-semibold text-gray-900">
        <span className="mr-2">Total Amount:</span>
        <span>Rs. {getTotal()}</span>
      </div>

      {/* Confirm */}
      <div className="mt-8 text-right">
        <button
          onClick={handleConfirm}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition"
        >
          Confirm Transaction
        </button>
      </div>
    </div>
  );
};

export default Transaction;
