import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadOrders: (state, action) => {
      state.orders = action.payload;
    },
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },
    clearOrders: (state) => {
      state.orders = [];
    },
    updateOrder: (state, action) => {
      const { orderId, updates } = action.payload;
      const orderIndex = state.orders.findIndex(
        (order) => order.orderId === orderId,
      );
      if (orderIndex !== -1) {
        state.orders[orderIndex] = { ...state.orders[orderIndex], ...updates };
      }
    },
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.orderId !== action.payload,
      );
    },
  },
});

export const { loadOrders, addOrder, clearOrders, updateOrder, deleteOrder } =
  userSlice.actions;

export const selectOrders = (state) => state.user.orders;

export default userSlice.reducer;
