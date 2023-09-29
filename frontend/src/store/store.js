import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./slices/expense";
const store = configureStore({
  reducer: {
    expense: expenseSlice,
  },
});
export default store;
