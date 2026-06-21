import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login({ darkMode, setDarkMode }) {
  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-12 lg:py-16 min-h-[70vh] flex justify-center items-center">
        <div
          className={`w-full max-w-sm md:max-w-md shadow-sm border rounded-2xl p-6 md:p-8 ${
            darkMode
              ? "bg-slate-800 border-slate-700 text-white"
              : "bg-white border-gray-200 text-black"
          }`}
        >
          <h1 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8">
            Login to your account
          </h1>

          <div className="space-y-4 md:space-y-5">
            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full rounded-lg px-4 py-3 border text-sm focus:outline-none ${
                  darkMode
                    ? "bg-slate-900 border-slate-700 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className={`w-full rounded-lg px-4 py-3 border text-sm focus:outline-none ${
                  darkMode
                    ? "bg-slate-900 border-slate-700 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
              />
            </div>

            <button
              className={`w-full py-3 rounded-lg transition ${
                darkMode
                  ? "bg-slate-900 hover:bg-slate-700 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-white"
              }`}
            >
              Login
            </button>

            <p className="text-center text-sm opacity-70">
              Don't have an account?
              <span className="font-semibold ml-1 cursor-pointer">
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </main>

      <Footer darkMode={darkMode} />
    </>
  );
}

export default Login;