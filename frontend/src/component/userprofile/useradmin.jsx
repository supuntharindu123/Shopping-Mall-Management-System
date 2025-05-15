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
            className="bg-teal-800 hover:bg-teal-700 px-4 py-2 rounded"
          >
            Memberships
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-gray-50 p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="mb-3">
                  <h3 className="text-teal-900 font-semibold text-lg">
                    {user.fullName}
                  </h3>
                  <p className="text-gray-600 text-sm">{user.username}</p>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditUser(user);
                    }}
                    className="text-teal-600 hover:text-teal-800 font-medium text-sm px-3 py-1 rounded hover:bg-teal-50 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteUser(user.id);
                    }}
                    className="text-red-600 hover:text-red-800 font-medium text-sm px-3 py-1 rounded hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
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
