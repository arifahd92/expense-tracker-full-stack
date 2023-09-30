import {configureStore} from '@reduxjs/toolkit';
import expenseSlice from './slices/expense';
import headerSlice from './slices/header';
const store = configureStore ({
  reducer: {
    expense: expenseSlice,
    user: headerSlice,
  },
});
export default store;
