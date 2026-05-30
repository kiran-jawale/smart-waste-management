//Vite will inject the value from .env file here
//a safe fallback as "" If no variable is found
//it will use relative paths (perfect for Render).

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const API_ROUTES_URL = `${API_BASE_URL}/api/v2`;