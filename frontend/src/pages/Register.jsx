import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import GoogleButton from "../components/GoogleButton";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import api from "../services/api";

function Register({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register", { name, email, password });
      toast.success("Registration Successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className={`min-h-[80vh] flex items-center justify-center px-4 py-12 ${darkMode ? "bg-[#16231A]" : "bg-[#FAF8F3]"}`}>
        <div className={`w-full max-w-md rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 ${darkMode ? "bg-[#243127] text-white" : "bg-white text-gray-900"}`}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-green-700 dark:text-green-400">
            Create Account
          </h1>

          <p className="text-center mt-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">
            Join Product Description AI today
          </p>

          <form onSubmit={handleRegister} className="mt-6 space-y-3.5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-3 text-xs md:text-sm border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-3 text-xs md:text-sm border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-3 text-xs md:text-sm border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-3 text-xs md:text-sm border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            <Button
              type="submit"
              className="w-full mt-2"
              size="md"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Register"}
            </Button>

            <GoogleButton />
          </form>

          <p className="text-center mt-6 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-green-700 dark:text-green-400 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </main>

      <Footer darkMode={darkMode} />
    </>
  );
}

export default Register;