import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#115e59",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!",
      });

      if (result.isConfirmed) {
        // Clear all stored data
        localStorage.clear();

        // Show success message
        await Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success",
          timer: 1500,
        });

        // Redirect to login
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong during logout!",
      });
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-white hover:text-gray-200 transition-colors"
    >
      Logout
    </button>
  );
};

export default Logout;
