import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Card from "../components/Card";

import {
  Sparkles,
  Search,
  Clock3,
} from "lucide-react";

function Home({ darkMode, setDarkMode }) {
  return (
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <Hero />

      {/* About */}

      <section
        className={`py-24 ${
          darkMode
            ? "bg-[#16231A]"
            : "bg-[#F8FAF5]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">

          <h2
            className={`text-4xl font-bold text-center ${
              darkMode
                ? "text-green-300"
                : "text-green-700"
            }`}
          >
            Why Product Description AI?
          </h2>

          <p
            className={`max-w-3xl mx-auto mt-6 text-center leading-8 ${
              darkMode
                ? "text-gray-300"
                : "text-gray-600"
            }`}
          >
            Product Description AI helps
            startups and small businesses
            create engaging product descriptions
            in seconds using Artificial Intelligence.
            Save time, improve SEO and increase
            conversions effortlessly.
          </p>

        </div>
      </section>
      {/* How It Works */}

      <section
        className={`py-24 ${
          darkMode
            ? "bg-[#16231A]"
            : "bg-[#F8FAF5]"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">

          <h2
            className={`text-center text-4xl font-bold ${
              darkMode
                ? "text-green-300"
                : "text-green-700"
            }`}
          >
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10 mt-16">

            {[
              {
                number: "01",
                title: "Enter Product",
                text: "Provide the product name, category and key features.",
              },
              {
                number: "02",
                title: "Generate",
                text: "AI creates a compelling and SEO-friendly description.",
              },
              {
                number: "03",
                title: "Copy & Use",
                text: "Copy the description and publish it instantly.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className={`rounded-3xl p-8 shadow-lg text-center ${
                  darkMode
                    ? "bg-[#243127]"
                    : "bg-white"
                }`}
              >
                <div className="text-5xl font-bold text-green-600">
                  {step.number}
                </div>

                <h3
                  className={`mt-5 text-2xl font-bold ${
                    darkMode
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                >
                  {step.title}
                </h3>

                <p
                  className={`mt-4 leading-8 ${
                    darkMode
                      ? "text-gray-300"
                      : "text-gray-600"
                  }`}
                >
                  {step.text}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      <Footer darkMode={darkMode} />
    </>
  );
}

export default Home;