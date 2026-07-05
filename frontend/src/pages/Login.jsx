import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";

function Login({ darkMode, setDarkMode }) {
  return (
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="bg-[#FAF8F3] min-h-screen flex items-center justify-center px-6">

        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-10">

          <h1 className="text-4xl font-bold text-center text-green-700">
            Login
          </h1>

          <p className="text-center mt-3 text-gray-500">
            Welcome back!
          </p>

          <input
            type="email"
            placeholder="Email"
            className="w-full mt-8 shadow-sm rounded-xl px-4 py-3"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mt-5 shadow-sm rounded-xl px-4 py-3"
          />

          <Button
            className="w-full mt-8"
            size="lg"
          >
            Login
          </Button>

          <p className="text-center mt-6 text-gray-500">
              Don't have an account?
              <Link to="/register" className="text-green-700 font-semibold hover:underline ml-1">
                Register
              </Link>
            </p>
        </div>

      </main>

      <Footer />

    </>
  );
}

export default Login;