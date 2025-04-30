import React, { useState } from "react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({ type: "", message: "" });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setAlert({
          type: "success",
          message: data.message || "Registration successful!",
        });
      } else {
        setAlert({
          type: "error",
          message: data.message || "Registration failed.",
        });
      }
    } catch (error) {
      console.error("Error registering:", error);
      setAlert({
        type: "error",
        message: "Registration failed. Please try again.",
      });
    }

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-teal-900 text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        {/* Alert Box */}
        {showAlert && (
          <div
            className={`p-3 rounded-lg mb-4 text-white text-center ${
              alert.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Username"
            className="w-full p-2 border rounded-lg mb-4"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded-lg mb-4"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded-lg mb-4"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-teal-900 text-white w-full p-2 rounded-lg hover:bg-gray-400"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
