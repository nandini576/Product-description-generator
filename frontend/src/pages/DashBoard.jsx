import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard({ darkMode, setDarkMode }) {
  const cardStyle = {
    backgroundColor: darkMode ? "#1e293b" : "white",
    color: darkMode ? "white" : "black",
    border: darkMode
      ? "1px solid #334155"
      : "1px solid #e5e7eb",
  };

  const subTextStyle = {
    color: darkMode ? "#cbd5e1" : "#6b7280",
  };

  return (
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-12 lg:py-16 min-h-[70vh]">

        <h1
          style={{
            color: darkMode ? "white" : "black",
          }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold"
        >
          Dashboard
        </h1>

        <p
          style={{
            color: darkMode ? "#cbd5e1" : "#6b7280",
          }}
          className="mt-2 mb-6 md:mb-10 text-sm md:text-base"
        >
          Welcome back! Here's what's happening.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">

          <div
            style={cardStyle}
            className="rounded-xl p-5 md:p-6 shadow-md"
          >
            <p
              style={subTextStyle}
              className="text-sm"
            >
              Total Descriptions
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              120
            </h2>
          </div>

          <div
            style={cardStyle}
            className="rounded-xl p-5 md:p-6 shadow-md"
          >
            <p
              style={subTextStyle}
              className="text-sm"
            >
              This Month
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              32
            </h2>
          </div>

          <div
            style={cardStyle}
            className="rounded-xl p-5 md:p-6 shadow-md"
          >
            <p
              style={subTextStyle}
              className="text-sm"
            >
              Words Generated
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              12.5K
            </h2>
          </div>

          <div
            style={cardStyle}
            className="rounded-xl p-5 md:p-6 shadow-md"
          >
            <p
              style={subTextStyle}
              className="text-sm"
            >
              Time Saved
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              8.4 hrs
            </h2>
          </div>

        </div>

        {/* Recent Generations */}
        <div
          style={cardStyle}
          className="rounded-2xl p-4 md:p-6 shadow-md overflow-x-auto"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
            Recent Generations
          </h2>

          <table className="w-full min-w-[700px]">

            <thead>
              <tr
                style={{
                  borderBottom: darkMode
                    ? "1px solid #334155"
                    : "1px solid #e5e7eb",
                }}
              >
                <th className="text-left py-3 text-sm md:text-base">
                  Product Name
                </th>

                <th className="text-left py-3 text-sm md:text-base">
                  Category
                </th>

                <th className="text-left py-3 text-sm md:text-base">
                  Words
                </th>

                <th className="text-left py-3 text-sm md:text-base">
                  Created At
                </th>

                <th className="text-left py-3 text-sm md:text-base">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>

              <tr
                style={{
                  borderBottom: darkMode
                    ? "1px solid #334155"
                    : "1px solid #e5e7eb",
                }}
              >
                <td className="py-4 text-sm md:text-base">
                  Wireless Headphones
                </td>

                <td>Electronics</td>

                <td>150</td>

                <td>21 Jun 2026</td>

                <td className="text-green-600">
                  Completed
                </td>
              </tr>

              <tr
                style={{
                  borderBottom: darkMode
                    ? "1px solid #334155"
                    : "1px solid #e5e7eb",
                }}
              >
                <td className="py-4 text-sm md:text-base">
                  Protein Powder
                </td>

                <td>Health</td>

                <td>120</td>

                <td>20 Jun 2026</td>

                <td className="text-green-600">
                  Completed
                </td>
              </tr>

              <tr>
                <td className="py-4 text-sm md:text-base">
                  Coffee Mug
                </td>

                <td>Kitchen</td>

                <td>90</td>

                <td>19 Jun 2026</td>

                <td className="text-green-600">
                  Completed
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </main>

      <Footer darkMode={darkMode} />
    </>
  );
}

export default Dashboard;