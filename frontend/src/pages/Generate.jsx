import { useState } from "react";
import { Sparkles, Copy, RotateCcw, Check } from "lucide-react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function Generate({ darkMode, setDarkMode }) {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Homemade Snacks");
  const [tone, setTone] = useState("Professional");
  const [keyFeatures, setKeyFeatures] = useState("");

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

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

  async function handleGenerate() {
    if (!productName.trim() || !category || !keyFeatures.trim()) {
      setError("Please fill in all required fields.");
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const featureArray = keyFeatures
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");

      const res = await api.post("/generate", {
        productName,
        category,
        tone,
        keyFeatures: featureArray,
      });

      const generatedDesc = res.data.description;
      setDescription(generatedDesc);

      await api.post("/history", {
        productName,
        category,
        keyFeatures: featureArray,
        description: generatedDesc,
      });

      toast.success("Description generated and saved!");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to generate description.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(description);
    setCopied(true);
    toast.success("Copied to clipboard!");

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  function handleReset() {
    setDescription("");
    handleGenerate();
  }

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10 min-h-[75vh]">
        <div className="mb-6 md:mb-8">
          <h1
            className="text-2xl md:text-3xl font-bold flex items-center gap-2"
            style={{ color: darkMode ? "white" : "black" }}
          >
            <Sparkles className="text-green-600" size={24} />
            AI Product Description Generator
          </h1>

          <p
            className="mt-1 text-xs md:text-sm"
            style={{ color: darkMode ? "#cbd5e1" : "#6b7280" }}
          >
            Generate attractive descriptions for farm-fresh and homemade food products using AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* LEFT FORM */}
          <div
            style={cardStyle}
            className="lg:col-span-2 rounded-2xl p-4 md:p-6 shadow-sm space-y-4"
          >
            <div>
              <label className="text-xs md:text-sm font-medium block mb-1">
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Homemade Mango Pickle"
                style={inputStyle}
                className="w-full rounded-xl px-4 py-2.5 text-xs md:text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs md:text-sm font-medium block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={inputStyle}
                className="w-full rounded-xl px-4 py-2.5 text-xs md:text-sm focus:outline-none"
              >
                <option>Millets</option>
                <option>Homemade Snacks</option>
                <option>Pickles & Chutneys</option>
                <option>Spices & Masalas</option>
                <option>Cold Pressed Oils</option>
                <option>Honey & Natural Sweeteners</option>
                <option>Dry Fruits & Nuts</option>
                <option>Fresh Fruits</option>
                <option>Vegetables</option>
                <option>Dairy Products</option>
                <option>Organic Products</option>
                <option>Grains & Pulses</option>
              </select>
            </div>

            <div>
              <label className="text-xs md:text-sm font-medium block mb-1">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                style={inputStyle}
                className="w-full rounded-xl px-4 py-2.5 text-xs md:text-sm focus:outline-none"
              >
                <option>Professional</option>
                <option>Marketing</option>
                <option>Luxury</option>
                <option>Casual</option>
              </select>
            </div>

            <div>
              <label className="text-xs md:text-sm font-medium block mb-1">
                Key Features (comma-separated)
              </label>
              <textarea
                rows={4}
                value={keyFeatures}
                onChange={(e) => setKeyFeatures(e.target.value)}
                placeholder="Farm Fresh, Organic, Stone Ground, Rich in Protein..."
                style={inputStyle}
                className="w-full rounded-xl px-4 py-2.5 text-xs md:text-sm resize-none focus:outline-none"
              />
              <p className="text-[11px] mt-1 text-gray-500 dark:text-gray-400">
                {keyFeatures.split(",").filter((item) => item.trim()).length} feature(s) entered
              </p>
            </div>

            <button
              disabled={loading}
              onClick={handleGenerate}
              className={`w-full rounded-xl py-3 text-xs md:text-sm font-semibold transition active:scale-95 cursor-pointer ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-green-600 hover:bg-green-700 text-white shadow-md"
              }`}
            >
              {loading ? "Generating Description..." : "Generate with AI"}
            </button>
          </div>

          {/* RIGHT OUTPUT DISPLAY */}
          <div
            style={cardStyle}
            className="lg:col-span-3 rounded-2xl shadow-sm p-4 md:p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 dark:border-slate-800">
                <div>
                  <h2 className="text-base md:text-lg font-semibold flex items-center gap-2">
                    <Sparkles size={18} className="text-green-600" />
                    AI Generated Description
                  </h2>
                  <p className="text-xs mt-0.5 text-gray-500 dark:text-gray-400">
                    Sourced from Gemini AI model based on your product features.
                  </p>
                </div>

                {description && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 border border-green-600 text-green-600 px-3 py-1.5 rounded-xl text-xs hover:bg-green-50 dark:hover:bg-green-900/20 transition cursor-pointer"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                )}
              </div>

              {loading ? (
                <div className="space-y-4 py-8">
                  <p className="text-green-600 text-xs md:text-sm font-medium animate-pulse">
                    ✨ AI is crafting your product description...
                  </p>
                  <div className={`h-4 rounded animate-pulse ${darkMode ? "bg-slate-700" : "bg-gray-200"}`} />
                  <div className={`h-4 rounded animate-pulse ${darkMode ? "bg-slate-700" : "bg-gray-200"}`} />
                  <div className={`h-4 rounded animate-pulse ${darkMode ? "bg-slate-700" : "bg-gray-200"}`} />
                  <div className={`h-4 w-2/3 rounded animate-pulse ${darkMode ? "bg-slate-700" : "bg-gray-200"}`} />
                </div>
              ) : error ? (
                <div className="rounded-xl border border-red-300 bg-red-50 dark:bg-red-900/20 p-4">
                  <p className="text-red-500 text-xs md:text-sm font-medium">{error}</p>
                </div>
              ) : description ? (
                <div className="space-y-4">
                  <div
                    className={`rounded-xl p-4 md:p-5 text-xs md:text-sm leading-relaxed whitespace-pre-line ${
                      darkMode ? "bg-slate-900" : "bg-gray-50"
                    }`}
                  >
                    {description}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-2">
                    <span>{description.length} characters</span>
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-1 text-green-600 hover:underline cursor-pointer"
                    >
                      <RotateCcw size={14} />
                      <span>Regenerate</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Sparkles size={48} className="text-green-500/40 mb-3" />
                  <h3 className="text-base font-semibold">Ready to Generate</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mt-1">
                    Fill in your product details on the left and click <strong>Generate with AI</strong>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer darkMode={darkMode} />
    </>
  );
}

export default Generate;