import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("myCart", async (id) => {
  try {
    const { data } = await axios.get(`/api/users/${id}/cart`);
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const addCartProduct = createAsyncThunk(
  "addToCart",
  async ({ productId, cartId, qty }) => {
    const { data } = await axios.post(`/api/cartproducts/`, {
      productId,
      cartId,
      qty,
    });
    return data;
  }
);

export const checkoutCart = createAsyncThunk("checkoutCart", async (cartId) => {
  const { data } = await axios.put(`/api/carts/${cartId}`);
  return data;
});

export const deleteCartItem = createAsyncThunk(
  "deleteCartItem",
  async (cartproductId) => {
    const { data } = await axios.delete(`/api/cartproducts/${cartproductId}`);
    return data;
  }
);

export const editCartProduct = createAsyncThunk(
  "editCampus",
  async ({ cartproductId, qty }) => {
    const { data } = await axios.put(`/api/cartproducts/${cartproductId}`, {
      qty,
    });
    return data;
  }
);

const initialState = {
  info: {},
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    clearCart: (state) => {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.info = action.payload;
    });
    builder.addCase(addCartProduct.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(checkoutCart.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(editCartProduct.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});
export const selectCart = (state) => {
  return state.cart;
};

export default cartSlice.reducer;
