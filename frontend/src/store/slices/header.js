import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  login: true,
  boardFlag: false,
  darkFlag: false,
};
const user = createSlice ({
  initialState,
  name: 'user',
  reducers: {
    toggleBoardFlag: (state, action) => {
      state.boardFlag = !state.boardFlag;
    },
    clearUserState: state => {
      return {
        login: true,
        boardFlag: false,
      };
    },
    darkFlagHandel: (state, action) => {
      state.darkFlag = action.payload;
    },
  },
});
export const {toggleBoardFlag, clearUserState, darkFlagHandel} = user.actions;
export default user.reducer;
