// // frontend/src/AuthProvider.jsx
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { api } from "./api"; // Utility function for API calls (assumed to handle fetch and JSON parsing)

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
//   });
//   const [token, setToken] = useState(() => localStorage.getItem("token"));

//   useEffect(() => {
//     if (token) localStorage.setItem("token", token);
//     else localStorage.removeItem("token");
//   }, [token]);

//   useEffect(() => {
//     if (user) localStorage.setItem("user", JSON.stringify(user));
//     else localStorage.removeItem("user");
//   }, [user]);

//   const login = async (email, password) => {
//     const data = await api("/api/auth/login", { method: "POST", body: { email, password } });
//     setToken(data.token);
//     setUser(data.user);
//     return data;
//   };

//   // This is the single, official register function used by the entire application.
//   // We rename the local function definition to avoid conflicts inside the component body.
//   const registerUser = async (name, email, password, phone) => {
//     // Calls the backend registration endpoint using the api utility
//     const data = await api("/api/auth/register", { method: "POST", body: { name, email, password, phone } });
    
//     // Assumes successful registration returns user data and a token
//     setToken(data.token);
//     setUser(data.user);
//     return data;
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//   };

//   const fetchMe = async () => {
//     if (!token) return null;
//     const data = await api("/api/auth/me", { token});
//     setUser(data.user);
//     return data.user;
//   };

//   return (
//     <AuthContext.Provider 
//         value={{ 
//             user, 
//             token, 
//             login, 
//             register: registerUser, // Maps the internal 'registerUser' function to the external 'register' name
//             logout, 
//             fetchMe 
//         }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);

// frontend/src/AuthProvider.jsx

// C:\Users\abhis\OneDrive\Desktop\SOFTWARE_DEVELOPER_LEARNING\marathon_project\frontend\src\AuthProvider.jsx - FINAL RBAC-READY VERSION

import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "./api"; 

// 1. Create the Auth Context
const AuthContext = createContext({
    user: { isLoggedIn: false, role: null }, // Define initial shape for clarity
    token: null,
    loading: true, // Add loading state
    login: () => {},
    // ... other functions
});

// 2. Custom Hook
export const useAuth = () => useContext(AuthContext); 

// 3. Auth Provider Component
export function AuthProvider({ children }) {
  // State to hold full user object including role and login status
  const [user, setUser] = useState({ isLoggedIn: false, role: null }); 
  const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true); // CRITICAL for ProtectedRoute

    // Load initial state from storage and set loading state
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser({
                    ...parsedUser,
                    isLoggedIn: true,
                    // If role is missing, default it to 'user'
                    role: parsedUser.role || 'user', 
                });
                setToken(storedToken);
            } catch {
                // Clear storage if parsing fails
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        }
        setLoading(false);
    }, []);

  // Effect: Sync token state to localStorage
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // Effect: Sync user state to localStorage (only store if logged in)
  useEffect(() => {
    if (user.isLoggedIn) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);


  // Authentication API Calls
  const login = async (email, password) => {
    setLoading(true);
    try {
        const data = await api("/api/auth/signin", { method: "POST", body: { email, password } });
        
        if (data.token && data.user) {
            // CRITICAL: Assuming data.user contains { id, email, role, etc. }
            setToken(data.token);
            setUser({ 
                ...data.user,
                isLoggedIn: true,
                role: data.user.role || 'user', // Ensure role is set
            });
            return { success: true, user: data.user };
        }
        return { success: false, message: data.message || 'Login failed' };
    } catch (error) {
        return { success: false, message: error.message || 'Network error' };
    } finally {
        setLoading(false);
    }
  };

  const registerUser = async (name, email, password, phone) => {
    setLoading(true);
    try {
        const data = await api("/api/auth/register", { method: "POST", body: { name, email, password, phone } });
        
        if (data.token && data.user) {
            setToken(data.token);
            setUser({ 
                ...data.user,
                isLoggedIn: true,
                role: data.user.role || 'user', // Default role after registration
            });
            return { success: true, user: data.user };
        }
        return { success: false, message: data.message || 'Registration failed' };
    } catch (error) {
        return { success: false, message: error.message || 'Network error' };
    } finally {
        setLoading(false);
    }
  };

  const logout = () => {
    setLoading(true);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser({ isLoggedIn: false, role: null });
    setLoading(false);
  };

  const fetchMe = async () => {
    if (!token) return null;
    // NOTE: If fetchMe returns an updated user, make sure it includes the role
    const data = await api("/api/auth/me", { token }); 
    if (data.user) {
        setUser({ 
            ...data.user,
            isLoggedIn: true,
            role: data.user.role || 'user',
        });
        return data.user;
    }
    return null;
  };

  return (
    <AuthContext.Provider 
        value={{ 
            user, 
            token,
            loading, // Expose loading state
            login, 
            register: registerUser, 
            logout, 
            fetchMe 
        }}
    >
      {children}
    </AuthContext.Provider>
  );
}