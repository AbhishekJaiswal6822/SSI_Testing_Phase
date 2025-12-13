// frontend/src/AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "./api"; // Utility function for API calls (assumed to handle fetch and JSON parsing)

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const login = async (email, password) => {
    const data = await api("/api/auth/login", { method: "POST", body: { email, password } });
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  // This is the single, official register function used by the entire application.
  // We rename the local function definition to avoid conflicts inside the component body.
  const registerUser = async (name, email, password, phone) => {
    // Calls the backend registration endpoint using the api utility
    const data = await api("/api/auth/register", { method: "POST", body: { name, email, password, phone } });
    
    // Assumes successful registration returns user data and a token
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const fetchMe = async () => {
    if (!token) return null;
    const data = await api("/api/auth/me", { token});
    setUser(data.user);
    return data.user;
  };

  return (
    <AuthContext.Provider 
        value={{ 
            user, 
            token, 
            login, 
            register: registerUser, // Maps the internal 'registerUser' function to the external 'register' name
            logout, 
            fetchMe 
        }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);