import React, { useState, useEffect } from "react";

// Example User Data
const usersData = [
  {
    id: 1,
    username: "john_doe",
    fullName: "John Doe",
    email: "john@example.com",
  },
  {
    id: 2,
    username: "jane_doe",
    fullName: "Jane Doe",
    email: "jane@example.com",
  },
  {
    id: 3,
    username: "alex_smith",
    fullName: "Alex Smith",
    email: "alex@example.com",
  },
  {
    id: 4,
    username: "mary_jones",
    fullName: "Mary Jones",
    email: "mary@example.com",
  },
];

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setUsers(usersData); // Example data, replace with API call to fetch users
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="bg-teal-900 text-white p-4 flex justify-between items-center mb-4">
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
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* User List */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-teal-900 text-2xl font-bold mb-4">
            User Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-gray-50 p-4 border rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                onClick={() => handleSelectUser(user)}
              >
                <h3 className="text-teal-900 font-semibold">{user.fullName}</h3>
                <p className="text-gray-600">{user.username}</p>
                <p className="text-gray-400">{user.email}</p>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-600 mt-2 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* User Details Section */}
        {selectedUser && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-teal-900 text-2xl font-bold mb-4">
              User Details
            </h2>
            <p className="text-teal-900">Full Name: {selectedUser.fullName}</p>
            <p className="text-teal-900">Username: {selectedUser.username}</p>
            <p className="text-teal-900">Email: {selectedUser.email}</p>
            <div className="mt-4">
              <button
                className="bg-teal-900 text-white px-6 py-2 rounded-lg hover:bg-teal-800"
                onClick={() => setSelectedUser(null)}
              >
                Close Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
