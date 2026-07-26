import { Link, NavLink } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, token } = useAuth();

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Generate", path: "/generate" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#2E7D32] shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="text-xl md:text-2xl font-bold text-white tracking-wide">
          Product Description AI
        </Link>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `transition text-sm lg:text-base font-medium ${
                  isActive
                    ? "text-white border-b-2 border-white pb-1"
                    : "text-green-100 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {token && user && (
            <span className="text-white text-sm font-semibold truncate max-w-[120px]">
              Hi, {user.name}
            </span>
          )}

          {token ? (
            <button
              onClick={logout}
              className="text-white hover:text-red-200 text-sm font-medium transition"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="text-green-100 hover:text-white text-sm font-medium transition"
            >
              Login
            </NavLink>
          )}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-white/20 hover:bg-white/30 transition rounded-full p-2 text-white"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} className="text-yellow-300" /> : <Moon size={18} />}
          </button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-white/20 hover:bg-white/30 transition rounded-full p-2 text-white mr-1"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} className="text-yellow-300" /> : <Moon size={18} />}
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white p-1">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#246628] border-t border-green-600/40 px-4 py-3 space-y-2">
          {links.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm text-green-100 hover:text-white font-medium"
            >
              {item.name}
            </NavLink>
          ))}

          {token && user && (
            <div className="py-2 text-xs text-green-200 border-t border-green-600/30 font-semibold">
              Signed in as {user.name}
            </div>
          )}

          {token ? (
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm text-red-200 font-medium"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm text-white font-medium"
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;