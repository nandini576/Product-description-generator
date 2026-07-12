import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Generate from "./pages/Generate";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import OAuthSuccess from "./pages/OAuthSuccess";
function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
className={
darkMode
?
"dark min-h-screen bg-slate-900"
:
"min-h-screen bg-white"
}
>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          <Route
            path="/about"
            element={
              <About
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          <Route

path="/generate"

element={

<ProtectedRoute>

<Generate

darkMode={darkMode}

setDarkMode={setDarkMode}

/>

</ProtectedRoute>

}

/><Route

path="/dashboard"

element={

<ProtectedRoute>

<Dashboard

darkMode={darkMode}

setDarkMode={setDarkMode}

/>

</ProtectedRoute>

}

/>

          <Route
            path="/login"
            element={
              <Login
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />
          <Route

path="/oauth-success"

element={<OAuthSuccess/>}

/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;