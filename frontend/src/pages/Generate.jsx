import { useState } from "react";
import {
  Sparkles,
  Copy,
  RotateCcw,
  Check,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function Generate({ darkMode, setDarkMode }) {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [tone, setTone] = useState("Professional");
  const [keyFeatures, setKeyFeatures] = useState("");

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [copied, setCopied] = useState(false);

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

  async function handleGenerate() {
    if (
      !productName ||
      !category ||
      !keyFeatures
    ) {
      setError("Please fill all fields.");
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

      setDescription(res.data.description);

      await api.post("/history", {
        productName,
        category,
        keyFeatures: featureArray,
        description: res.data.description,
      });
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message ||
          "Failed to generate description."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(description);

    setCopied(true);

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
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="max-w-7xl mx-auto px-6 py-10 min-h-[75vh]">

        <div className="mb-8">

          <h1
            className="text-3xl font-bold flex items-center gap-2"
            style={{
              color: darkMode ? "white" : "black",
            }}
          >
            <Sparkles className="text-green-600" />

            AI Product Description Generator
          </h1>

          <p
            className="mt-2 text-sm"
            style={{
              color: darkMode
                ? "#cbd5e1"
                : "#6b7280",
            }}
          >
          Generate attractive descriptions for farm-fresh and homemade food products using AI.          </p>

        </div>

        <div className="grid lg:grid-cols-5 gap-6">

          {/* LEFT */}

          <div
            style={cardStyle}
            className="lg:col-span-2 rounded-2xl p-5 shadow-md space-y-4"
          >

            <div>

              <label className="text-sm font-medium">

                Product Name

              </label>

              <input
                type="text"
                value={productName}
                onChange={(e) =>
                  setProductName(e.target.value)
                }
                placeholder="Homemade Mango Pickle"
                style={inputStyle}
                className="mt-2 w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none"
              />

            </div>

            <div>

              <label className="text-sm font-medium">

                Category

              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                style={inputStyle}
                className="mt-2 w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none"
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

              <label className="text-sm font-medium">

                Tone

              </label>

              <select
                value={tone}
                onChange={(e) =>
                  setTone(e.target.value)
                }
                style={inputStyle}
                className="mt-2 w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none"
              >
                <option>Professional</option>
                <option>Marketing</option>
                <option>Luxury</option>
                <option>Casual</option>
              </select>

            </div>

            <div>

              <label className="text-sm font-medium">

                Key Features

              </label>

              <textarea
                rows={5}
                value={keyFeatures}
                onChange={(e) =>
                  setKeyFeatures(e.target.value)
                }
                placeholder="Farm Fresh, Organic, Stone Ground, Rich in Protein, Locally Sourced..."
                style={inputStyle}
                className="mt-2 w-full rounded-xl px-4 py-3 text-sm resize-none focus:outline-none"
              />

              <p
                className="text-xs mt-2"
                style={{
                  color: darkMode
                    ? "#94a3b8"
                    : "#6b7280",
                }}
              >
                {
                  keyFeatures
                    .split(",")
                    .filter((item) => item.trim())
                    .length
                }{" "}
                features detected
              </p>

            </div>

            <button
              disabled={loading}
              onClick={handleGenerate}
              className={`w-full rounded-xl py-3 text-sm font-semibold transition ${
                loading
                  ? "bg-gray-500 cursor-not-allowed text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {loading
                ? "Generating..."
                : "Generate with AI"}
            </button>

          </div>
                    {/* RIGHT */}

          <div
            style={cardStyle}
            className="lg:col-span-3 rounded-2xl shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-5">

              <div>

                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Sparkles
                    size={20}
                    className="text-green-600"
                  />
                  AI Generated Description
                </h2>

                <p
                  className="text-sm mt-1"
                  style={{
                    color: darkMode
                      ? "#94a3b8"
                      : "#6b7280",
                  }}
                >
                Professional product description highlighting freshness, quality, and local sourcing.                </p>

              </div>

              {description && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 border border-green-600 text-green-600 px-3 py-2 rounded-lg text-sm hover:bg-green-50 dark:hover:bg-green-900/20 transition"
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </button>
              )}

            </div>

            {loading ? (

              <div className="space-y-4">

                <p className="text-green-600 font-medium">
                  ✨ AI is writing your description...
                </p>

                <div
                  className={`h-4 rounded animate-pulse ${
                    darkMode
                      ? "bg-slate-700"
                      : "bg-gray-200"
                  }`}
                ></div>

                <div
                  className={`h-4 rounded animate-pulse ${
                    darkMode
                      ? "bg-slate-700"
                      : "bg-gray-200"
                  }`}
                ></div>

                <div
                  className={`h-4 rounded animate-pulse ${
                    darkMode
                      ? "bg-slate-700"
                      : "bg-gray-200"
                  }`}
                ></div>

                <div
                  className={`h-4 w-3/4 rounded animate-pulse ${
                    darkMode
                      ? "bg-slate-700"
                      : "bg-gray-200"
                  }`}
                ></div>

              </div>

            ) : error ? (

              <div className="rounded-xl border border-red-300 bg-red-50 dark:bg-red-900/20 p-4">

                <p className="text-red-500 font-medium">
                  {error}
                </p>

              </div>

            ) : description ? (

              <>

                <div
                  className={`rounded-xl p-5 leading-8 whitespace-pre-line ${
                    darkMode
                      ? "bg-slate-900"
                      : "bg-gray-50"
                  }`}
                >
                  {description}
                </div>

                <div className="mt-5 flex items-center justify-between">

                  <span
                    className="text-xs"
                    style={{
                      color: darkMode
                        ? "#94a3b8"
                        : "#6b7280",
                    }}
                  >
                    {description.length} characters
                  </span>

                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 border border-green-600 text-green-600 px-3 py-2 rounded-lg text-sm hover:bg-green-50 dark:hover:bg-green-900/20 transition"
                  >
                    <RotateCcw size={16} />
                    Regenerate
                  </button>

                </div>

              </>

            ) : (

              <div className="h-full flex flex-col justify-center items-center py-20">

                <Sparkles
                  size={60}
                  className="text-green-500 mb-5"
                />

                <h3
                  className="text-lg font-semibold"
                  style={{
                    color: darkMode
                      ? "white"
                      : "black",
                  }}
                >
                  Ready to Generate
                </h3>

                <p
                  className="text-sm mt-2 max-w-md text-center"
                  style={{
                    color: darkMode
                      ? "#94a3b8"
                      : "#6b7280",
                  }}
                >
                  Fill in your product information and click
                  <strong> Generate with AI </strong>
                  to receive a professional product description.
                </p>

              </div>

            )}

          </div>

        </div>

      </main>

      <Footer darkMode={darkMode} />

    </>
  );
}

export default Generate;