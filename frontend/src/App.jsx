import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import About from "./pages/About";
import DashBoard from "./pages/DashBoard";
import Generate from "./pages/Generate";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OAuthSuccess from "./pages/OAuthSuccess";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ui/ErrorBoundary";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ErrorBoundary>
      <div className={darkMode ? "dark min-h-screen bg-slate-900 text-white" : "min-h-screen bg-[#FAF8F3] text-slate-900"}>
        <Toaster position="top-right" reverseOrder={false} />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />}
            />
            <Route
              path="/about"
              element={<About darkMode={darkMode} setDarkMode={setDarkMode} />}
            />
            <Route
              path="/generate"
              element={
                <ProtectedRoute>
                  <Generate darkMode={darkMode} setDarkMode={setDarkMode} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashBoard darkMode={darkMode} setDarkMode={setDarkMode} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={<Login darkMode={darkMode} setDarkMode={setDarkMode} />}
            />
            <Route
              path="/register"
              element={<Register darkMode={darkMode} setDarkMode={setDarkMode} />}
            />
            <Route path="/oauth-success" element={<OAuthSuccess />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
}

export default App;