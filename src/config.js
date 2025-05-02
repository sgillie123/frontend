// Ensure the backend URL has the correct format with trailing slash if needed
export const backendUrl = import.meta.env.VITE_BACKEND_URL
  ? import.meta.env.VITE_BACKEND_URL.endsWith("/")
    ? import.meta.env.VITE_BACKEND_URL.slice(0, -1)
    : import.meta.env.VITE_BACKEND_URL
  : "http://localhost:4000"

// Define currency symbol as a separate export
export const currency = "$"

console.log("Backend URL:", backendUrl) 