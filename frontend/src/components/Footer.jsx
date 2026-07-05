import { ArrowUp, Mail } from "lucide-react";
import { Link } from "react-router-dom";

function Footer({ darkMode }) {
  return (
    <footer
      className={`${
        darkMode
          ? "bg-[#16231A]"
          : "bg-[#2E7D32]"
      } text-white mt-12`}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Logo */}

          <div>

            <h2 className="text-2xl font-bold">

              Product Description AI

            </h2>

            <p className="text-green-100 mt-3 leading-7">

              Helping small businesses create
              engaging AI-powered product
              descriptions in seconds.

            </p>

          </div>

          {/* Links */}

          <div>

            <h3 className="font-semibold mb-4">

              Quick Links

            </h3>

            <div className="space-y-2">

              <Link to="/">Home</Link><br />

              <Link to="/about">About</Link><br />

              <Link to="/generate">Generate</Link><br />

              <Link to="/dashboard">Dashboard</Link><br />

              <Link to="/login">Login</Link>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="font-semibold mb-4">

              Contact

            </h3>

            <div className="flex items-center gap-3">

              <Mail />

              contact@productai.com

            </div>

            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="mt-5 flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-full hover:scale-105 transition"
            >

              <ArrowUp size={18} />

              Back To Top

            </button>

          </div>

        </div>

        <hr className="my-6 border-green-600" />

        <p className="text-center text-sm text-green-100">

          © 2026 Product Description AI • All Rights Reserved.

        </p>

      </div>
    </footer>
  );
}

export default Footer;