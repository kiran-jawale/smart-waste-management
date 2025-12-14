import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false, // User is not authenticated
  user: null,    // No user data
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // This action is dispatched when a user successfully logs in
    login: (state, action) => {
      state.status = true;
      state.user = action.payload; // The user object (e.g., { name, email, role })
    },
    // This action is dispatched on logout
    logout: (state) => {
      state.status = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;