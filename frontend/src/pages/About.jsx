import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About({ darkMode, setDarkMode }) {
  return (
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="max-w-7xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold text-center text-green-700">
          About Our Project
        </h1>

        <p className="mt-8 text-lg text-center max-w-3xl mx-auto text-gray-600 leading-8">

          Product Description AI is an AI-powered
          application that helps businesses create
          compelling, SEO-friendly product
          descriptions in just a few seconds.

        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-20">

          <div className="bg-white shadow-md rounded-2xl p-8">

            <h2 className="text-2xl font-semibold text-green-500">
              Our Mission
            </h2>

            <p className="mt-4 text-gray-600">
               To empower every small business with AI-driven tools that make
                professional product marketing simple, affordable, and
                accessible. We believe every product deserves the opportunity to
                reach the right audience, regardless of the size of the company
                behind it.
            </p>

          </div>

          <div className="bg-white shadow-md rounded-2xl p-8">

            <h2 className="text-2xl font-semibold text-green-500">
              Our Vision
            </h2>

            <p className="mt-4 text-gray-600">
             Our vision is to become a trusted AI companion for businesses
                around the world by helping entrepreneurs showcase their
                products more effectively, improve customer engagement, and
                compete confidently in today's digital marketplace.
            </p>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default About;