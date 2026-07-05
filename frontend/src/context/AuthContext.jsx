import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  function login(userData, jwt) {

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwt);

    setUser(userData);
    setToken(jwt);
  }

  function logout() {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);

  }

  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>

  );

}

export const useAuth = () => useContext(AuthContext);