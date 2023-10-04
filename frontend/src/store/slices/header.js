import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  login: true,
  boardFlag: false,
  darkFlag: false,
  reportFlag: false,
};
const user = createSlice ({
  initialState,
  name: 'user',
  reducers: {
    toggleBoardFlag: (state, action) => {
      state.boardFlag = !state.boardFlag;
    },
    toggleReportFlag: (state, action) => {
      state.reportFlag = !state.reportFlag;
    },

    darkFlagHandel: (state, action) => {
      state.darkFlag = action.payload;
    },
  },
});
export const {
  toggleBoardFlag,
  clearUserState,
  darkFlagHandel,
  toggleReportFlag,
} = user.actions;
export default user.reducer;
