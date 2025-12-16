// frontend/src/main.jsx 

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css';
import App from './App.jsx';
import { AuthProvider } from "./AuthProvider";

// 1. IMPORT TOAST COMPONENTS AND STYLES
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
      {/* 2. ADD THE TOAST CONTAINER HERE (Always visible at the bottom of your app tree) */}
      <ToastContainer 
        position="top-center" // Center position is modern and clear
        autoClose={5000}      // Notifications auto-close after 5 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" 
      />
    </AuthProvider>
  </StrictMode>
);