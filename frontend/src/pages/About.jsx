import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About({ darkMode, setDarkMode }) {
  return (
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-12 lg:py-16 min-h-[70vh]">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Image Placeholder */}
          <div
            className={`rounded-2xl h-60 md:h-72 lg:h-80 flex items-center justify-center shadow-sm border ${
              darkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div
              className={`w-16 h-16 md:w-20 md:h-20 rounded-lg ${
                darkMode
                  ? "bg-slate-700"
                  : "bg-gray-200"
              }`}
            />
          </div>

          {/* Content */}
          <div>

            <h1
              className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }`}
            >
              About Us
            </h1>

            <p
              className={`text-sm md:text-base leading-7 md:leading-8 mb-4 md:mb-6 ${
                darkMode
                  ? "text-slate-300"
                  : "text-gray-600"
              }`}
            >
              We built this tool to help entrepreneurs,
              marketers and e-commerce sellers create
              high-quality product descriptions effortlessly
              using the power of AI.
            </p>

            <p
              className={`text-sm md:text-base leading-7 md:leading-8 ${
                darkMode
                  ? "text-slate-300"
                  : "text-gray-600"
              }`}
            >
              Our mission is to make content creation
              faster, smarter and easier for everyone.
            </p>

          </div>

        </div>

      </main>

      <Footer darkMode={darkMode} />
    </>
  );
}

export default About;