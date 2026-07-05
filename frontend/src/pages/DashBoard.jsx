import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard({ darkMode, setDarkMode }) {
  const [history, setHistory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API = "http://localhost:5000/api/history";

  const cardStyle = {
    backgroundColor: darkMode ? "#1e293b" : "white",
    color: darkMode ? "white" : "black",
    border: darkMode ? "1px solid #334155" : "1px solid #e5e7eb",
  };

  const inputStyle = {
    backgroundColor: darkMode ? "#0f172a" : "white",
    color: darkMode ? "white" : "black",
    border: darkMode ? "1px solid #334155" : "1px solid #d1d5db",
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
      console.log(res.data.data);
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
      const res = await axios.get(`${API}/search?q=${search}`);
      setHistory(res.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);

      setHistory(history.filter((item) => item.id !== id));

      if (selectedItem?.id === id) {
        setSelectedItem(null);
        setIsModalOpen(false);
      }

      alert("Deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  };

  async function handleView(id) {
    try {
      const res = await axios.get(`${API}/${id}`);
      setSelectedItem(res.data.data);
      setIsModalOpen(true);
       console.log("DATA:", res.data); // 👈 add this

    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdate(item) {
    const newDescription = prompt(
      "Edit description:",
      item.generatedDescription
    );

    if (!newDescription) return;

    try {
      await axios.put(`${API}/${item.id}`, {
        ...item,
        generatedDescription: newDescription,
      });

      fetchHistory();

      if (selectedItem?.id === item.id) {
        setSelectedItem({
          ...selectedItem,
          generatedDescription: newDescription,
        });
      }

      alert("Updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Update failed.");
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="max-w-7xl mx-auto px-6 py-10 min-h-[70vh]">

        <h1 className="text-4xl font-bold" style={{ color: darkMode ? "white" : "black" }}>
          Dashboard
        </h1>

        <p className="mt-2 mb-8" style={{ color: darkMode ? "#cbd5e1" : "#6b7280" }}>
          Manage your generated food descriptions using the backend APIs.
        </p>

        {/* SEARCH */}
        <div style={cardStyle} className="rounded-xl p-6 shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Search by product name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={inputStyle}
              className="flex-1 rounded-lg px-4 py-2"
            />

            <button
              onClick={handleSearch}
              className="px-3 py-1.5 text-sm rounded-md border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 active:scale-95 transition cursor-pointer"
            >
              Search
            </button>

            <button
              onClick={fetchHistory}
              className="px-3 py-1.5 text-sm rounded-md border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 active:scale-95 transition cursor-pointer"
            >
              Refresh
            </button>

          </div>
        </div>

        {/* TABLE */}
        <div style={cardStyle} className="rounded-xl p-6 shadow-md">

          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">{error}</div>
          ) : history.length === 0 ? (
            <div className="text-center py-10">
              No descriptions found.
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr>
                    <th className="text-left py-4">Product</th>
                    <th className="text-left py-4">Category</th>
                    <th className="text-left py-4">Features</th>
                    <th className="text-left py-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {history.map((item) => (
                    <tr key={item.id} className="border-b">

                      <td className="py-4">{item.productName}</td>
                      <td>{item.category}</td>

                      <td>
                        {Array.isArray(item.keyFeatures)
                          ? item.keyFeatures.join(", ")
                          : item.keyFeatures}
                      </td>

                      {/* ACTIONS */}
                      <td>
                        <div className="flex gap-2 flex-wrap text-xs">

                          <button
                            onClick={() => handleView(item.id)}
                            className="px-2 py-1 rounded-md border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 active:scale-95 transition cursor-pointer text-xs"
                          >
                            View
                          </button>

                          <button
                            onClick={() => handleUpdate(item)}
                            className="px-2 py-1 rounded-md border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 active:scale-95 transition cursor-pointer text-xs"
                          >
                            Update
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="px-2 py-1 rounded-md border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 active:scale-95 transition cursor-pointer text-xs"
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
        </div>

        {/* MODAL */}
        {isModalOpen && selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div
              className="w-full max-w-2xl rounded-xl p-6 relative"
              style={{
                backgroundColor: darkMode ? "#0f172a" : "white",
                color: darkMode ? "white" : "black",
              }}
            >

              {/* CLOSE BUTTON */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-xl text-gray-400 hover:text-red-500"
              >
                ✕
              </button>

              <h2 className="text-2xl font-semibold mb-4">
                Description Details
              </h2>

              <p><strong>Product:</strong> {selectedItem.productName}</p>
              <p><strong>Category:</strong> {selectedItem.category}</p>

              <p className="mt-2">
                <strong>Features:</strong>{" "}
                {Array.isArray(selectedItem.keyFeatures)
                  ? selectedItem.keyFeatures.join(", ")
                  : selectedItem.keyFeatures}
              </p>

              <p className="mt-4 font-semibold">Description:</p>

              <p className="mt-2 leading-7">
                {selectedItem.generatedDescription}
              </p>

            </div>

          </div>
        )}

      </main>

      <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
    </>
  );
}

export default Dashboard;