import { ArrowUp, Mail } from "lucide-react";
import { Link } from "react-router-dom";

function Footer({ darkMode }) {
  return (
    <footer
      className={`${
        darkMode ? "bg-[#16231A]" : "bg-[#2E7D32]"
      } text-white mt-12 transition-colors`}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">Product Description AI</h2>
            <p className="text-green-100 text-xs md:text-sm mt-3 leading-6">
              Helping small businesses create engaging AI-powered product descriptions in seconds.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm md:text-base mb-3">Quick Links</h3>
            <div className="space-y-2 text-xs md:text-sm">
              <div><Link to="/" className="text-green-100 hover:text-white transition">Home</Link></div>
              <div><Link to="/about" className="text-green-100 hover:text-white transition">About</Link></div>
              <div><Link to="/generate" className="text-green-100 hover:text-white transition">Generate</Link></div>
              <div><Link to="/dashboard" className="text-green-100 hover:text-white transition">Dashboard</Link></div>
              <div><Link to="/login" className="text-green-100 hover:text-white transition">Login</Link></div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm md:text-base mb-3">Contact</h3>
            <div className="flex items-center gap-2 text-xs md:text-sm text-green-100">
              <Mail size={16} />
              <span>contact@productai.com</span>
            </div>

            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="mt-5 flex items-center gap-2 bg-white text-green-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium hover:scale-105 transition shadow"
            >
              <ArrowUp size={16} />
              <span>Back To Top</span>
            </button>
          </div>
        </div>

        <hr className="my-6 border-green-600/50" />

        <p className="text-center text-xs text-green-100">
          © 2026 Product Description AI • All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;