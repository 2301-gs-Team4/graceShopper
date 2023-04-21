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
  "singleProduct",
  async (productID, cartId, qtyId) => {
      const { data } = await axios.get(`/api/products/${productID}/${cartId}/${qtyId}`);
      console.log(data)
      return data;
  });

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
    builder.addCase(fetchCart.rejected, (state, action) => {
      return Error("Trouble Fetching Your Cart");
    });
    builder.addCase(addCartProduct.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addCartProduct.rejected, (state, action) => {
      return Error("Trouble This Product to a Cart Product");
    });
  },
});
export const selectCart = (state) => {
  return state.cart;
};

export default cartSlice.reducer;
