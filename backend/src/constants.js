// Environment Variables
export const PORT = process.env.PORT || 3000;
export const MONGODB_URI = process.env.MONGODB_URI;
export const DB_NAME = process.env.DB_NAME;

export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;

export const CORS_ORIGIN = process.env.CORS_ORIGIN;

// Other Constants
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true, 
};

export const COLLECTOR_SECRET_CODE = process.env.COLLECTOR_SECRET_CODE
export const ADMIN_SECRET_CODE = process.env.ADMIN_SECRET_CODE

export const reasonOptions = [
  "Daily Collection",
  "Scheduled Pickup",
  "Complaint Resolution",
  "Other"
];