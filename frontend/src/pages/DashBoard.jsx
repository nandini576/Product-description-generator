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
        <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
          Dashboard
        </h1>

        <p className="mt-1 mb-6 text-sm font-semibold text-slate-700 dark:text-slate-200">
          Manage your saved product descriptions created using AI.
        </p>

        {/* SEARCH BAR */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 md:p-6 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by product name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full rounded-xl px-4 py-2.5 text-xs md:text-sm font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 outline-none transition"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSearch}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs md:text-sm font-bold rounded-xl bg-green-600 hover:bg-green-700 text-white active:scale-95 transition cursor-pointer shadow-sm"
              >
                <Search size={15} />
                Search
              </button>

              <button
                onClick={() => {
                  setSearch("");
                  fetchHistory();
                }}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs md:text-sm font-bold rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 active:scale-95 transition cursor-pointer shadow-sm"
              >
                <RotateCw size={15} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* TABLE CONTENT */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 md:p-6 shadow-sm overflow-hidden">
          {loading ? (
            <Loader size="md" />
          ) : error ? (
            <div className="text-center text-red-600 font-bold py-8 text-sm">{error}</div>
          ) : history.length === 0 ? (
            <EmptyState
              title={search ? "No matching descriptions" : "No history available"}
              message={search ? `No products found matching "${search}".` : "You haven't generated any product descriptions yet."}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-slate-300 dark:border-slate-700">
                    <th className="py-3.5 px-3 font-bold text-slate-900 dark:text-white">Product</th>
                    <th className="py-3.5 px-3 font-bold hidden sm:table-cell text-slate-900 dark:text-white">Category</th>
                    <th className="py-3.5 px-3 font-bold hidden md:table-cell text-slate-900 dark:text-white">Features</th>
                    <th className="py-3.5 px-3 font-bold text-right text-slate-900 dark:text-white">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {history.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                      {/* Product Name */}
                      <td className="py-4 px-3 font-bold text-slate-900 dark:text-white">
                        {item.productName}
                        <div className="sm:hidden text-[11px] text-slate-600 dark:text-slate-300 font-normal mt-0.5">{item.category}</div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-3 hidden sm:table-cell text-slate-800 dark:text-slate-100 font-bold">
                        {item.category}
                      </td>

                      {/* Key Features */}
                      <td className="py-4 px-3 hidden md:table-cell text-slate-800 dark:text-slate-200 max-w-xs truncate font-medium">
                        {Array.isArray(item.keyFeatures)
                          ? item.keyFeatures.join(", ")
                          : item.keyFeatures}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleView(item._id)}
                            className="p-2 rounded-lg border border-green-600 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-600 hover:text-white active:scale-95 transition cursor-pointer"
                            title="View Details"
                          >
                            <Eye size={15} />
                          </button>

                          <button
                            onClick={() => openEditModal(item)}
                            className="p-2 rounded-lg border border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-600 hover:text-white active:scale-95 transition cursor-pointer"
                            title="Edit"
                          >
                            <Edit size={15} />
                          </button>

                          <button
                            onClick={() => {
                              setDeleteId(item._id);
                              setIsDeleteModalOpen(true);
                            }}
                            className="p-2 rounded-lg border border-red-600 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-600 hover:text-white active:scale-95 transition cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={15} />
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
            <div className="space-y-4 text-xs md:text-sm text-slate-900 dark:text-white">
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300 block text-xs">Product Name</span>
                <p className="font-bold text-base text-slate-900 dark:text-white">{selectedItem.productName}</p>
              </div>

              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300 block text-xs">Category</span>
                <p className="text-slate-900 dark:text-white font-bold">{selectedItem.category}</p>
              </div>

              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300 block text-xs">Features</span>
                <p className="text-slate-900 dark:text-white font-bold">
                  {Array.isArray(selectedItem.keyFeatures)
                    ? selectedItem.keyFeatures.join(", ")
                    : selectedItem.keyFeatures}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-300 dark:border-slate-700">
                <span className="font-bold text-slate-700 dark:text-slate-300 block text-xs mb-1">Generated Description</span>
                <div className="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-4 rounded-xl leading-relaxed whitespace-pre-line text-slate-900 dark:text-white font-bold">
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
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">Description</label>
              <textarea
                rows={6}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full rounded-xl p-3 text-xs md:text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600 resize-none font-semibold"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs md:text-sm font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updating}
                className="px-4 py-2 rounded-xl text-xs md:text-sm font-bold bg-green-600 hover:bg-green-700 text-white transition disabled:opacity-50"
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
            <p className="text-xs md:text-sm text-slate-900 dark:text-white font-bold">
              Are you sure you want to delete this description? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs md:text-sm font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl text-xs md:text-sm font-bold bg-red-600 hover:bg-red-700 text-white transition"
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