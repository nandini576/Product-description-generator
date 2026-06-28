import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard({ darkMode, setDarkMode }) {
  const [history, setHistory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const API = "http://localhost:5000/api/history";

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

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      setLoading(true);

      const res = await axios.get(API);

      setHistory(res.data.data);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Unable to fetch history.");
      console.log(err);
    }
  }

  async function handleSearch() {
    try {
      if (search.trim() === "") {
        fetchHistory();
        return;
      }

      setLoading(true);

      const res = await axios.get(
        `${API}/search?q=${search}`
      );

      setHistory(res.data.data);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/history/${id}`);

    const updatedHistory = history.filter((item) => item.id !== id);
    setHistory(updatedHistory);

    // Remove Description Details if deleted item was selected
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem(null);
    }

    alert("Description deleted successfully.");
  } catch (error) {
    console.error(error);
    alert("Failed to delete description.");
  }
};
  async function handleView(id) {
    try {
      const res = await axios.get(`${API}/${id}`);

      setSelectedItem(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="max-w-7xl mx-auto px-6 py-10 min-h-[70vh]">

        <h1
          className="text-4xl font-bold"
          style={{
            color: darkMode ? "white" : "black",
          }}
        >
          Dashboard
        </h1>

        <p
          className="mt-2 mb-8"
          style={{
            color: darkMode ? "#cbd5e1" : "#6b7280",
          }}
        >
          Manage your generated food descriptions using the backend APIs.
        </p>

        <div
          style={cardStyle}
          className="rounded-xl p-6 shadow-md mb-8"
        >

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Search by product name..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              style={inputStyle}
              className="flex-1 rounded-lg px-4 py-2"
            />

            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Search
            </button>

            <button
              onClick={fetchHistory}
              className="bg-slate-700 text-white px-6 py-2 rounded-lg"
            >
              Refresh
            </button>

          </div>

        </div>

        <div
          style={cardStyle}
          className="rounded-xl p-6 shadow-md"
        >
                  {loading ? (
            <div className="text-center py-10">
              <h2 className="text-xl font-semibold">
                Loading...
              </h2>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">
              {error}
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-10">
              <h2 className="text-xl font-semibold">
                No descriptions found.
              </h2>

              <p className="mt-2 text-gray-500">
                Generate your first food description from the Generate page.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr
                    style={{
                      borderBottom: darkMode
                        ? "1px solid #334155"
                        : "1px solid #e5e7eb",
                    }}
                  >

                    <th className="text-left py-4">
                      Product
                    </th>

                    <th className="text-left py-4">
                      Category
                    </th>

                    <th className="text-left py-4">
                      Features
                    </th>

                    <th className="text-left py-4">
                      Description
                    </th>

                    <th className="text-left py-4">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {history.map((item) => (

                    <tr
                      key={item.id}
                      style={{
                        borderBottom: darkMode
                          ? "1px solid #334155"
                          : "1px solid #e5e7eb",
                      }}
                    >

                      <td className="py-5">
                        {item.productName}
                      </td>

                      <td>
                        {item.category}
                      </td>

                      <td>

                        {Array.isArray(item.keyFeatures)
                          ? item.keyFeatures.join(", ")
                          : item.keyFeatures}

                      </td>

                      <td className="max-w-sm">

                        <p className="line-clamp-2">

                          {item.generatedDescription}

                        </p>

                      </td>

                      <td>

                        <div className="flex gap-2 flex-wrap">

                          <button
                            onClick={() =>
                              handleView(item.id)
                            }
                            className="bg-slate-700 hover:bg-slate-800 text-white px-3 py-1 rounded transition"
                          >
                            View
                          </button>

                          <button
                            onClick={() =>
                              alert(
                                "Update endpoint is ready. Edit UI will be added in Week 5."
                              )
                            }
                            className="bg-slate-700 hover:bg-slate-800 text-white px-3 py-1 rounded transition"
                          >
                            Update
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(item.id)
                            }
                            className="bg-slate-700 hover:bg-slate-800 text-white px-3 py-1 rounded transitionbg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

          {selectedItem && (

            <div
              className="mt-8 rounded-xl p-6"
              style={{
                backgroundColor: darkMode
                  ? "#0f172a"
                  : "#f8fafc",
              }}
            >

              <h2 className="text-2xl font-semibold mb-5">
                Description Details
              </h2>

              <div className="space-y-3">

                <p>

                  <strong>Product :</strong>{" "}

                  {selectedItem.productName}

                </p>

                <p>

                  <strong>Category :</strong>{" "}

                  {selectedItem.category}

                </p>

                <p>

                  <strong>Features :</strong>{" "}

                  {Array.isArray(selectedItem.keyFeatures)
                    ? selectedItem.keyFeatures.join(", ")
                    : selectedItem.keyFeatures}

                </p>

                <p>

                  <strong>Description :</strong>

                </p>

                <p className="leading-7">

                  {selectedItem.generatedDescription}

                </p>

              </div>

            </div>

          )}
                  </div>

      </main>

      <Footer
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

    </>
  );
}

export default Dashboard;