import React, { useState } from "react";
import { redirect } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [alert, setAlert] = useState({ type: "", message: "" });
  const [showAlert, setShowAlert] = useState(false);

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const validatePassword = (password) => {
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password),
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "password") {
      validatePassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidPassword = Object.values(passwordValidation).every(Boolean);

    if (!isValidPassword) {
      setAlert({
        type: "error",
        message: "Password does not meet requirements!",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setAlert({
        type: "error",
        message: "Passwords do not match!",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    try {
      const { confirmPassword, ...submitData } = formData; // Remove confirmPassword from submission
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.ok) {
        setAlert({
          type: "success",
          message: data.message || "Registration successful!",
        });
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: "",
        });
        redirect("/login"); // Redirect to login page after successful registration
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
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            className="w-full p-2 border rounded-lg mb-4"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit phone number"
          />

          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 border rounded-lg mb-2"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="text-xs space-y-1">
              <p
                className={
                  passwordValidation.length ? "text-green-600" : "text-gray-500"
                }
              >
                ✓ At least 8 characters
              </p>
              <p
                className={
                  passwordValidation.uppercase
                    ? "text-green-600"
                    : "text-gray-500"
                }
              >
                ✓ One uppercase letter
              </p>
              <p
                className={
                  passwordValidation.lowercase
                    ? "text-green-600"
                    : "text-gray-500"
                }
              >
                ✓ One lowercase letter
              </p>
              <p
                className={
                  passwordValidation.number ? "text-green-600" : "text-gray-500"
                }
              >
                ✓ One number
              </p>
              <p
                className={
                  passwordValidation.special
                    ? "text-green-600"
                    : "text-gray-500"
                }
              >
                ✓ One special character (!@#$%^&*)
              </p>
            </div>
          </div>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className={`w-full p-2 border rounded-lg mb-4 ${
              formData.confirmPassword &&
              formData.password !== formData.confirmPassword
                ? "border-red-500"
                : ""
            }`}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-teal-900 text-white w-full p-2 rounded-lg hover:bg-gray-400"
          >
            Register
          </button>
          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-teal-900 hover:underline font-medium"
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
