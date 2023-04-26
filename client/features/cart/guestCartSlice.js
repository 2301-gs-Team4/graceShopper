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

// const handleAddToCart = (product) => {
//   if (isLoggedIn) {
//     dispatch(addToCart(user.id, product.id));
//   } else {
//     // get existing cart data from local storage
//     const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

//     // check if product already exists in cart
//     const existingItem = existingCart.find((item) => item.id === product.id);

//     if (existingItem) {
//       // increment quantity if product already exists in cart
//       existingItem.quantity += 1;
//     } else {
//       // add new product to cart with quantity 1
//       existingCart.push({ id: product.id, quantity: 1 });
//     }

//     // store updated cart data in local storage
//     localStorage.setItem("cart", JSON.stringify(existingCart));
//   }
// };

export const { addToCart, removeFromCart, clearCart } = guestCartSlice.actions;

export default guestCartSlice.reducer;
