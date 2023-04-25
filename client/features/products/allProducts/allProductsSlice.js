import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

// o: you don't need try / catches in thunks... i'll explain
export const fetchProductsAsync = createAsyncThunk("allProducts", async () => {
  try {
    const { data } = await axios.get("/api/products");
    return data;
  } catch (err) {
    console.log(err);
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      // Add user to the state array
      state = action.payload;
      return state;
    });
  },
});

export const selectProducts = (state) => {
  return state.products;
};

export default productsSlice.reducer;
