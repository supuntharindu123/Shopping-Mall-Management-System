import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/users");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      showErrorAlert("Failed to load users");
      setLoading(false);
    }
  };

  const handleEditUser = async (user) => {
    try {
      const { value: formValues } = await Swal.fire({
        title: "Edit User",
        html: `
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Username</label>
            <input 
              id="name" 
              class="swal2-input" 
              placeholder="Username" 
              value="${user.name || ""}" 
              required
            >
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input 
              id="email" 
              class="swal2-input" 
              placeholder="Email" 
              value="${user.email || ""}" 
              required
            >
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Phone Number</label>
            <input 
              id="phoneNumber" 
              class="swal2-input" 
              placeholder="Phone Number" 
              value="${user.phoneNumber || ""}" 
              required
            >
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Role</label>
            <select id="role" class="swal2-input">
              <option value="user" ${
                user.role === "user" ? "selected" : ""
              }>Regular User</option>
              <option value="admin" ${
                user.role === "admin" ? "selected" : ""
              }>Administrator</option>
            
            </select>
          </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonColor: "#115e59",
        confirmButtonText: "Update",
        customClass: {
          input: "form-control",
        },
        preConfirm: () => {
          const name = document.getElementById("name").value;
          const email = document.getElementById("email").value;
          const phoneNumber = document.getElementById("phoneNumber").value;
          const role = document.getElementById("role").value;

          // Validation
          if (!name || name.trim() === "") {
            Swal.showValidationMessage("Username is required");
            return false;
          }
          if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            Swal.showValidationMessage("Please enter a valid email address");
            return false;
          }
          if (!phoneNumber || !phoneNumber.match(/^\d{10}$/)) {
            Swal.showValidationMessage(
              "Please enter a valid 10-digit phone number"
            );
            return false;
          }

          return { name, email, phoneNumber, role };
        },
      });

      if (formValues) {
        const response = await axios.put(
          `http://localhost:3001/api/users/${user._id}`,
          formValues
        );

        if (response.data) {
          await fetchUsers();
          showSuccessAlert(
            `User ${formValues.name} has been updated successfully`
          );
        }
      }
    } catch (error) {
      console.error("Error updating user:", error);
      showErrorAlert(error.response?.data?.message || "Failed to update user");
    }
  };

  const handleDeleteUser = async (id) => {
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
        await axios.delete(`http://localhost:3001/api/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
        showSuccessAlert("User has been deleted successfully");
      }
    } catch (error) {
      showErrorAlert("Failed to delete user");
    }
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: message,
      confirmButtonColor: "#115e59",
    });
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
      confirmButtonColor: "#115e59",
    });
  };

  const renderUserCard = (user) => (
    <div
      key={user._id}
      className="bg-gray-50 p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="mb-3">
        <h3 className="text-teal-900 font-semibold text-lg">{user.name}</h3>
        <p className="text-gray-600 text-sm">{user.email}</p>
        <p className="text-gray-400 text-sm">{user.phoneNumber}</p>
        <p className="text-gray-400 text-sm">Role: {user.role}</p>
        <p className="text-gray-400 text-sm">Points: {user.points}</p>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={() => handleEditUser(user)}
          className="text-teal-600 hover:text-teal-800 font-medium text-sm px-3 py-1 rounded hover:bg-teal-50 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteUser(user._id)}
          className="text-red-600 hover:text-red-800 font-medium text-sm px-3 py-1 rounded hover:bg-red-50 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="p-8">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-teal-900 text-2xl font-bold mb-4">
            User Management
          </h2>
          {loading ? (
            <div className="text-center py-4">Loading users...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map(renderUserCard)}
            </div>
          )}
        </div>

        {selectedUser && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-teal-900 text-2xl font-bold mb-4">
              User Details
            </h2>
            <p className="text-teal-900">Username: {selectedUser.name}</p>
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
