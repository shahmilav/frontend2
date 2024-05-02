import { createSlice } from "@reduxjs/toolkit";

export const tradeSlice = createSlice({
  name: "trade",
  initialState: {
    quantity: 0,
    stock: "",
    action: "",
  },
  reducers: {
    updateQuantity: (state, action) => {
      state.quantity = action.payload;
    },

    updateStock: (state, action) => {
      state.stock = action.payload;
    },
    updateAction: (state, action) => {
      state.action = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateQuantity, updateStock, updateAction } = tradeSlice.actions;

export default tradeSlice.reducer;
