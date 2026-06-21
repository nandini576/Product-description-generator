import { Link } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav
      className={`shadow-md py-4 px-4 md:px-8 transition-colors duration-300 ${
        darkMode
          ? "bg-slate-900 text-white"
          : "bg-white text-slate-900"
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        <h1 className="font-bold text-base md:text-lg lg:text-xl text-center md:text-left">
          Product Description Generator
        </h1>

        <div className="flex flex-wrap justify-center md:justify-end items-center gap-2 md:gap-4 text-sm">

          <Link
            to="/"
            className="hover:text-gray-500 transition-colors"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="hover:text-gray-500 transition-colors"
          >
            About
          </Link>

          <Link
            to="/dashboard"
            className="hover:text-gray-500 transition-colors"
          >
            Dashboard
          </Link>

          <Link
            to="/generate"
            className="hover:text-gray-500 transition-colors"
          >
            Generate
          </Link>

          <Link
            to="/login"
            className="hover:text-gray-500 transition-colors"
          >
            Login
          </Link>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-3 py-2 rounded-lg border transition-colors ${
              darkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-gray-300"
            }`}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;