import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID =
  import.meta.env.GOOGLE_CLIENT_ID ||
  "323403265573-01r07n2dehruroetb492afapa8s4a47d.apps.googleusercontent.com";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          credential: credentialResponse.credential,
        }),
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
            email: data.email,
          })
        );

        Swal.fire({
          icon: "success",
          title: "Google Login Successful",
          text: `Welcome, ${data.username}!`,
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
        setError(data.message || "Google authentication failed");
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google authentication failed. Please try again.");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-teal-900 text-3xl font-bold mb-6 text-center">
          Welcome Back
        </h2>

        {/* Google Login Button */}
        <div className="mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="outline"
            size="large"
            width="100%"
            text="signin_with"
            shape="rectangular"
          />
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">
            or continue with email
          </span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Regular Login Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-teal-900 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-teal-900 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-900 text-white p-3 rounded-lg hover:bg-teal-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <div className="text-center">
            <a
              href="/forgot-password"
              className="text-teal-600 hover:text-teal-800 text-sm"
            >
              Forgot your password?
            </a>
          </div>

          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-teal-600 hover:text-teal-800 font-medium"
            >
              Create Account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <LoginContent />
    </GoogleOAuthProvider>
  );
}
