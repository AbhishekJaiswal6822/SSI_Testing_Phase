// // frontend/src/ProtectedRoute.jsx - FINAL STABLE VERSION

// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from './AuthProvider'; 

// function ProtectedRoute({ children }) {
//     const { user, loading } = useAuth(); 
//     const location = useLocation();

//     // 🛑 STABILITY IMPROVEMENT: Check Local Storage for the token as well.
//     // This helps resolve timing issues where 'user' state hasn't fully updated 
//     // but the token is already saved, preventing the false "Access Denied."
//     const tokenInStorage = localStorage.getItem('token'); 

//     if (loading) {
//         // Render a loading state while AuthProvider checks persistent storage
//         return (
//             <div className="min-h-screen flex items-center justify-center text-teal-600 font-semibold">
//                 Checking user session...
//             </div>
//         );
//     }

//     // Check if the user state is null AND the token is truly missing from storage.
//     // If 'user' is null AND 'tokenInStorage' is null, then deny access.
//     if (!user && !tokenInStorage) { 
//         // 1. Show a popup alert
//         alert("Access denied. Please Sign Up or Log In first.");
        
//         // 2. Redirect to the signup page
//         return <Navigate to="/signup" state={{ from: location }} replace />;
//     }

//     // If 'user' state is present OR the token is found in storage, grant access.
//     // This guarantees a smoother transition after auto-login.
//     return children;
// }

// export default ProtectedRoute;

// C:\Users\abhis\OneDrive\Desktop\SOFTWARE_DEVELOPER_LEARNING\marathon_project\frontend\src\ProtectedRoute.js - UPDATED

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider'; 

// Component now accepts an optional 'requiredRole' prop
const ProtectedRoute = ({ children, requiredRole }) => {
    const { user, loading } = useAuth();
    
    // 1. Loading state (wait for user data)
    if (loading) {
        return <div>Loading user session...</div>; 
    }

    // 2. Check for login
    if (!user || !user.isLoggedIn) {
        // If not logged in, redirect to signin page
        return <Navigate to="/signin" replace />;
    }

    // 3. Check for required role
    if (requiredRole && user.role !== requiredRole) {
        // If logged in but role does not match (e.g., 'user' trying to access 'admin' page)
        alert("Access Denied: You do not have permission to view this page.");
        return <Navigate to="/" replace />; // Redirect to a safe page (e.g., Home)
    }

    // 4. Access granted
    return children;
};

export default ProtectedRoute;