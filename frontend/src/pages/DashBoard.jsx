import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/ui/Modal";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import toast from "react-hot-toast";
import { Search, RotateCw, Eye, Edit, Trash2 } from "lucide-react";

function Dashboard({ darkMode, setDarkMode }) {
  const [history, setHistory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [editItem, setEditItem] = useState(null);
  const [editDescription, setEditDescription] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  const API = "/history";

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
      setError("");
      const res = await api.get(API);
      setHistory(res.data.data);
    } catch (err) {
      setError("Unable to fetch history.");
      toast.error("Failed to load description history.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch() {
    try {
      if (search.trim() === "") {
        fetchHistory();
        return;
      }
      setLoading(true);
      const res = await api.get(`${API}/search?q=${encodeURIComponent(search)}`);
      setHistory(res.data.data);
    } catch (err) {
      toast.error("Search failed.");
    } finally {
      setLoading(false);
    }
  }

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`${API}/${deleteId}`);
      setHistory(history.filter((item) => item._id !== deleteId));
      toast.success("Description deleted successfully.");
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    } catch (error) {
      toast.error("Delete failed.");
    }
  };

  async function handleView(id) {
    try {
      const res = await api.get(`${API}/${id}`);
      setSelectedItem(res.data.data);
      setIsViewModalOpen(true);
    } catch (err) {
      toast.error("Failed to fetch details.");
    }
  }

  function openEditModal(item) {
    setEditItem(item);
    setEditDescription(item.description);
    setIsEditModalOpen(true);
  }

  async function handleUpdateSubmit(e) {
    e.preventDefault();
    if (!editDescription.trim()) {
      toast.error("Description cannot be empty.");
      return;
    }

    try {
      setUpdating(true);
      await api.put(`${API}/${editItem._id}`, {
        ...editItem,
        description: editDescription,
      });

      setHistory(
        history.map((item) =>
          item._id === editItem._id ? { ...item, description: editDescription } : item
        )
      );

      toast.success("Updated successfully!");
      setIsEditModalOpen(false);
    } catch (err) {
      toast.error("Update failed.");
    } finally {
      setUpdating(false);
    }
  }

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10 min-h-[75vh]">
        <h1 className="text-2xl md:text-4xl font-bold" style={{ color: darkMode ? "white" : "black" }}>
          Dashboard
        </h1>

        <p className="mt-1 mb-6 text-sm" style={{ color: darkMode ? "#cbd5e1" : "#6b7280" }}>
          Manage your saved product descriptions created using AI.
        </p>

        {/* SEARCH BAR */}
        <div style={cardStyle} className="rounded-2xl p-4 md:p-6 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by product name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                style={inputStyle}
                className="w-full rounded-xl px-4 py-2 text-sm outline-none transition"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSearch}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 text-xs md:text-sm font-medium rounded-xl border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 active:scale-95 transition cursor-pointer"
              >
                <Search size={14} />
                Search
              </button>

              <button
                onClick={() => {
                  setSearch("");
                  fetchHistory();
                }}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 text-xs md:text-sm font-medium rounded-xl border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 active:scale-95 transition cursor-pointer"
              >
                <RotateCw size={14} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* TABLE CONTENT */}
        <div style={cardStyle} className="rounded-2xl p-4 md:p-6 shadow-sm overflow-hidden">
          {loading ? (
            <Loader size="md" />
          ) : error ? (
            <div className="text-center text-red-500 py-8 text-sm">{error}</div>
          ) : history.length === 0 ? (
            <EmptyState
              title={search ? "No matching descriptions" : "No history available"}
              message={search ? `No products found matching "${search}".` : "You haven't generated any product descriptions yet."}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-700 text-gray-500 dark:text-gray-400">
                    <th className="py-3 px-2 font-semibold">Product</th>
                    <th className="py-3 px-2 font-semibold hidden sm:table-cell">Category</th>
                    <th className="py-3 px-2 font-semibold hidden md:table-cell">Features</th>
                    <th className="py-3 px-2 font-semibold text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                  {history.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition">
                      <td className="py-3.5 px-2 font-medium text-gray-900 dark:text-white">
                        {item.productName}
                        <div className="sm:hidden text-[10px] text-gray-400 mt-0.5">{item.category}</div>
                      </td>
                      <td className="py-3.5 px-2 hidden sm:table-cell text-gray-600 dark:text-gray-300">
                        {item.category}
                      </td>
                      <td className="py-3.5 px-2 hidden md:table-cell text-gray-500 dark:text-gray-400 max-w-xs truncate">
                        {Array.isArray(item.keyFeatures)
                          ? item.keyFeatures.join(", ")
                          : item.keyFeatures}
                      </td>

                      <td className="py-3.5 px-2 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleView(item._id)}
                            className="p-1.5 rounded-lg border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 active:scale-95 transition"
                            title="View Details"
                          >
                            <Eye size={14} />
                          </button>

                          <button
                            onClick={() => openEditModal(item)}
                            className="p-1.5 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 active:scale-95 transition"
                            title="Edit"
                          >
                            <Edit size={14} />
                          </button>

                          <button
                            onClick={() => {
                              setDeleteId(item._id);
                              setIsDeleteModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg border border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 active:scale-95 transition"
                            title="Delete"
                          >
                            <Trash2 size={14} />
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

        {/* VIEW DETAILS MODAL */}
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Product Description Details"
        >
          {selectedItem && (
            <div className="space-y-4 text-xs md:text-sm">
              <div>
                <span className="font-semibold text-gray-500 dark:text-gray-400 block text-xs">Product Name</span>
                <p className="font-medium text-base text-gray-900 dark:text-white">{selectedItem.productName}</p>
              </div>

              <div>
                <span className="font-semibold text-gray-500 dark:text-gray-400 block text-xs">Category</span>
                <p className="text-gray-700 dark:text-gray-300">{selectedItem.category}</p>
              </div>

              <div>
                <span className="font-semibold text-gray-500 dark:text-gray-400 block text-xs">Features</span>
                <p className="text-gray-700 dark:text-gray-300">
                  {Array.isArray(selectedItem.keyFeatures)
                    ? selectedItem.keyFeatures.join(", ")
                    : selectedItem.keyFeatures}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-200 dark:border-slate-700">
                <span className="font-semibold text-gray-500 dark:text-gray-400 block text-xs mb-1">Generated Description</span>
                <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl leading-relaxed whitespace-pre-line text-gray-800 dark:text-gray-200">
                  {selectedItem.description}
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* EDIT MODAL */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Description"
        >
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Description</label>
              <textarea
                rows={6}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full rounded-xl p-3 text-xs md:text-sm border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-green-600 resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs md:text-sm font-medium border border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updating}
                className="px-4 py-2 rounded-xl text-xs md:text-sm font-medium bg-green-600 hover:bg-green-700 text-white transition disabled:opacity-50"
              >
                {updating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </Modal>

        {/* DELETE CONFIRMATION MODAL */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Confirm Delete"
        >
          <div className="space-y-4">
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
              Are you sure you want to delete this description? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs md:text-sm font-medium border border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl text-xs md:text-sm font-medium bg-red-600 hover:bg-red-700 text-white transition"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </main>

      <Footer darkMode={darkMode} />
    </>
  );
}

export default Dashboard;