import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const handleLogin = async (loginFunction) => {
    try {
      const userToken = await loginFunction();
      setToken(userToken);
      setIsLoggedIn(true);
      console.log("User logged in");
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setIsLoggedIn(false);
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
