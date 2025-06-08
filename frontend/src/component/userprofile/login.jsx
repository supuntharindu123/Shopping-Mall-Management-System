import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Store user data
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: data.token,
            role: data.role,
            username: data.username,
            id: data.id,
          })
        );

        // Success message
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome back, ${data.username}!`,
          timer: 1500,
        });

        // Role-based navigation
        switch (data.role) {
          case "admin":
            navigate("/admin");
            break;
          default:
            navigate("/");
            break;
        }
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-teal-900 text-2xl font-bold mb-6 text-center">
          Login
        </h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div>
            <label className="block text-teal-900 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-900"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-teal-900 font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-900"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-900 text-white p-3 rounded-lg hover:bg-gray-400 transition"
          >
            Login
          </button>
          <p className="text-center text-teal-900">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-teal-900 hover:underline font-medium"
            >
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
