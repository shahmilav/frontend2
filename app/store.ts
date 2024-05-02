import { configureStore } from "@reduxjs/toolkit";
import tradeReducer from "./features/trade/tradeSlice";
import dataReducer from "./features/data/dataSlice";

export const store = configureStore({
  reducer: {
    trade: tradeReducer,
    data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
