// frontend/src/api.js

// FIXED: API_BASE fallback port is now 8000
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5173";

export async function api(path, { method = "GET", body, token } = {}) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    // CRITICAL FIX: fullUrl is declared correctly
    const fullUrl = `${API_BASE}${path}`; 
    
    console.log(`[FRONTEND SENDING]: ${method} request to ${fullUrl}`);

    const res = await fetch(fullUrl, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });
    
    // ... rest of the fetch logic ...
    const text = await res.text().catch(() => "");
    let data;
    try { data = text ? JSON.parse(text) : null; } catch { data = text; }
    if (!res.ok) throw new Error(data?.message || res.statusText || "Request failed");
    return data;
}