import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  orders: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    addOrder: (state, action) => {
      state.orders = [action.payload, ...state.orders];
      // Also update localStorage
      const savedOrders = localStorage.getItem("orderHistory");
      const allOrders = savedOrders ? JSON.parse(savedOrders) : [];
      localStorage.setItem(
        "orderHistory",
        JSON.stringify([action.payload, ...allOrders]),
      );
    },
    loadOrders: (state, action) => {
      state.orders = action.payload;
    },
    clearOrders: (state) => {
      state.orders = [];
      // Also clear from localStorage
      localStorage.removeItem("orderHistory");
    },
    clearUser: (state) => {
      state.user = null;
      state.orders = [];
    },
  },
});

export const { setUser, addOrder, loadOrders, clearOrders, clearUser } =
  userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectOrders = (state) => state.user.orders;

export default userSlice.reducer;
