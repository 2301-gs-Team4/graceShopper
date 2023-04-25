import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

const guestCartSlice = createSlice({
  name: "guestCart",
  initialState: JSON.parse(localStorage.getItem("guestCart")) || [],
  reducers: {
    addToCart: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.find((item) => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.push({ productId, quantity });
      }
      localStorage.setItem("guestCart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const index = state.findIndex((item) => item.productId === productId);
      if (index !== -1) {
        state.splice(index, 1);
        localStorage.setItem("guestCart", JSON.stringify(state));
      }
    },
    clearCart: (state) => {
      state.splice(0, state.length);
      localStorage.removeItem("guestCart");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = guestCartSlice.actions;

export default guestCartSlice.reducer;
