import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

function Home({ darkMode, setDarkMode }) {
return (
<> <Navbar
     darkMode={darkMode}
     setDarkMode={setDarkMode}
   />

```
  <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-12 lg:py-16 min-h-[70vh]">

    {/* Hero Section */}
    <section className="text-center max-w-4xl mx-auto">

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`text-3xl md:text-5xl lg:text-6xl font-bold leading-tight ${
          darkMode ? "text-white" : "text-slate-900"
        }`}
      >
        Generate Product Descriptions with AI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className={`mt-4 md:mt-6 text-sm md:text-lg max-w-2xl mx-auto ${
          darkMode
            ? "text-slate-300"
            : "text-slate-500"
        }`}
      >
        Create engaging product descriptions
        in seconds using AI.
      </motion.p>

    </section>

    {/* Feature Cards */}
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-10 md:mt-16">

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          backgroundColor: darkMode ? "#1e293b" : "white",
          color: darkMode ? "white" : "black",
          border: darkMode
            ? "1px solid #334155"
            : "1px solid #e5e7eb",
        }}
        className="rounded-2xl p-6 md:p-8 shadow-md"
      >
        <div
          style={{
            backgroundColor: darkMode
              ? "#475569"
              : "#e5e7eb",
          }}
          className="w-12 h-12 rounded-lg mb-4"
        ></div>

        <h2 className="font-semibold text-lg md:text-xl">
          AI Powered
        </h2>

        <p
          style={{
            color: darkMode
              ? "#cbd5e1"
              : "#6b7280",
          }}
          className="mt-2 text-sm md:text-base"
        >
          Generate descriptions instantly
          with advanced AI technology.
        </p>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 3,
          delay: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          backgroundColor: darkMode ? "#1e293b" : "white",
          color: darkMode ? "white" : "black",
          border: darkMode
            ? "1px solid #334155"
            : "1px solid #e5e7eb",
        }}
        className="rounded-2xl p-6 md:p-8 shadow-md"
      >
        <div
          style={{
            backgroundColor: darkMode
              ? "#475569"
              : "#e5e7eb",
          }}
          className="w-12 h-12 rounded-lg mb-4"
        ></div>

        <h2 className="font-semibold text-lg md:text-xl">
          E-Commerce Ready
        </h2>

        <p
          style={{
            color: darkMode
              ? "#cbd5e1"
              : "#6b7280",
          }}
          className="mt-2 text-sm md:text-base"
        >
          Optimized descriptions for Amazon,
          Shopify and other marketplaces.
        </p>
      </motion.div>

    </section>

  </main>

  <Footer darkMode={darkMode} />
</>


);
}
        
export default Home;
