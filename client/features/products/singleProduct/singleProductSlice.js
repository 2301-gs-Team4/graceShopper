import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleProduct = createAsyncThunk(
  "singleProduct",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const editProductQuantity = createAsyncThunk(
  "editProductQuantity",
  async (productId, { qty }) => {
    try {
      const { data } = await axios.put(`/api/products/${productId}`, { qty });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
  info: {},
};

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.info = action.payload;
    });
    builder.addCase(editProductQuantity.fulfilled, (state, action) => {
      state.info.qty = action.payload;
    });
  },
});

export const selectSingleProduct = (state) => {
  return state.singleProduct;
};

export default singleProductSlice.reducer;
