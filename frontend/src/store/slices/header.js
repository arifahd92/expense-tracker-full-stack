import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  login: true,
  boardFlag: false,
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
  },
});
export const {toggleBoardFlag, clearUserState} = user.actions;
export default user.reducer;
