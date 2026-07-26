import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import GoogleButton from "../components/GoogleButton";

function Login({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email.trim() || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);
      toast.success("Login Successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className={`min-h-[80vh] flex items-center justify-center px-4 py-12 ${darkMode ? "bg-[#16231A]" : "bg-[#FAF8F3]"}`}>
        <div className={`rounded-3xl shadow-xl w-full max-w-md p-6 sm:p-8 md:p-10 ${darkMode ? "bg-[#243127] text-white" : "bg-white text-gray-900"}`}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-green-700 dark:text-green-400">
            Login
          </h1>

          <p className="text-center mt-2 text-xs sm:text-sm font-medium text-black dark:text-gray-200">
            Welcome back! Please enter your details.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full rounded-xl px-4 py-3 text-xs md:text-sm border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full rounded-xl px-4 py-3 text-xs md:text-sm border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-4"
              size="md"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <GoogleButton />
          </form>

          <p className="text-center mt-6 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-700 dark:text-green-400 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </main>

      <Footer darkMode={darkMode} />
    </>
  );
}

export default Login;