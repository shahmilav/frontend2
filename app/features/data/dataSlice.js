import { createSlice } from "@reduxjs/toolkit";
import { RowData } from "../../components/TableSort/TableSort";
import {Account} from "../../components/AccountData/AccountData";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    portfolio: RowData,
    account: Account,
  },
  reducers: {
    updatePortfolio: (state, action) => {
      state.portfolio = action.payload;
    },

    updateAccount: (state, action) => {
      state.account = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updatePortfolio, updateAccount } = dataSlice.actions;

export default dataSlice.reducer;
