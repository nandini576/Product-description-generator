import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Generate({ darkMode, setDarkMode }) {
  const cardStyle = {
    backgroundColor: darkMode ? "#1e293b" : "white",
    color: darkMode ? "white" : "black",
    border: darkMode
      ? "1px solid #334155"
      : "1px solid #e5e7eb",
  };

  const inputStyle = {
    backgroundColor: darkMode ? "#0f172a" : "white",
    color: darkMode ? "white" : "black",
    border: darkMode
      ? "1px solid #334155"
      : "1px solid #d1d5db",
  };

  return (
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="max-w-6xl mx-auto px-6 py-16 min-h-[70vh]">

        <h1
          style={{
            color: darkMode ? "white" : "black",
          }}
          className="text-4xl font-bold mb-2"
        >
          Generate New Description
        </h1>

        <p
          style={{
            color: darkMode ? "#cbd5e1" : "#6b7280",
          }}
          className="mb-10"
        >
          Fill in the details below and let AI do the magic.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Form */}

          <div className="space-y-5">

            <div>
              <label
                style={{
                  color: darkMode ? "#cbd5e1" : "#374151",
                }}
                className="block text-sm mb-2"
              >
                Product Name
              </label>

              <input
                type="text"
                placeholder="Enter product name"
                style={inputStyle}
                className="w-full rounded-lg px-4 py-2 focus:outline-none"
              />
            </div>

            <div>
              <label
                style={{
                  color: darkMode ? "#cbd5e1" : "#374151",
                }}
                className="block text-sm mb-2"
              >
                Category
              </label>

              <input
                type="text"
                placeholder="Enter category"
                style={inputStyle}
                className="w-full rounded-lg px-4 py-2 focus:outline-none"
              />
            </div>

            <div>
              <label
                style={{
                  color: darkMode ? "#cbd5e1" : "#374151",
                }}
                className="block text-sm mb-2"
              >
                Key Features
              </label>

              <input
                type="text"
                placeholder="Enter key features"
                style={inputStyle}
                className="w-full rounded-lg px-4 py-2 focus:outline-none"
              />
            </div>

            <button className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800">
              Generate Description
            </button>

          </div>

          {/* Output */}

          <div
            style={cardStyle}
            className="rounded-2xl p-6 shadow-md"
          >
            <h2 className="font-semibold mb-6">
              Generated Description
            </h2>

            <div className="space-y-3">

              <div
                style={{
                  backgroundColor: darkMode
                    ? "#475569"
                    : "#e5e7eb",
                }}
                className="h-4 rounded"
              ></div>

              <div
                style={{
                  backgroundColor: darkMode
                    ? "#475569"
                    : "#e5e7eb",
                }}
                className="h-4 rounded"
              ></div>

              <div
                style={{
                  backgroundColor: darkMode
                    ? "#475569"
                    : "#e5e7eb",
                }}
                className="h-4 rounded"
              ></div>

              <div
                style={{
                  backgroundColor: darkMode
                    ? "#475569"
                    : "#e5e7eb",
                }}
                className="h-4 rounded"
              ></div>

              <div
                style={{
                  backgroundColor: darkMode
                    ? "#475569"
                    : "#e5e7eb",
                }}
                className="h-4 rounded"
              ></div>

              <div
                style={{
                  backgroundColor: darkMode
                    ? "#475569"
                    : "#e5e7eb",
                }}
                className="h-4 rounded"
              ></div>

            </div>
          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default Generate;