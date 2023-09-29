import axios from 'axios';
const {createSlice, createAsyncThunk} = require ('@reduxjs/toolkit');
const initialState = {
  expense: [],
  isLoading: false,
  unAuthorize: false,
};
const userToken = localStorage.getItem ('userToken');
// *******************fetching data action***************************************
export const fetchExpenses = createAsyncThunk ('getExpense', async () => {
  try {
    const response = await axios.get (`http://localhost:4000/get-expense`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken,
      },
    });
    console.log ('get data response');

    return response.data;
  } catch (error) {
    // Handle the error response here
    console.error ('Error fetching expenses:', error.response.data);

    if (error.response.data.verification === false) {
      throw error;
      // Re-throw the error so it gets caught in the Redux slice
    }
  }
});
//************deleting data action****************************************************
export const deleteExpense = createAsyncThunk (
  // it accepts only one args
  'delete expense',
  async payload => {
    try {
      const expenseId = payload.id;
      //setRequest(true);
      console.log (payload.id);
      console.log (payload.index);
      const response = await axios.delete (
        `http://localhost:4000/delete-expense/${expenseId}`
      );
      if (response.status != 200) {
        alert ('some thing went wrong try again');
        return -1;
      }
      const data = await response.data;
      return payload.index;
    } catch (error) {
      console.log (error.message);
      alert (error.message);
      if (error.response.data.verification === false) {
        console.log ('invalid token');
        throw error;
        // navigate("/");
      } else {
        return -1;
      }
    }
  }
);
//*********adding/updating action***********************************************************
export const addUpdate = createAsyncThunk (
  'addUpdate',
  async ({expenseId, editFlag, editIndex, input}) => {
    try {
      let response;
      let addURL = `http://localhost:4000/add-expense`;
      let updateURL = `http://localhost:4000/update-expense/${expenseId}`;
      if (editFlag) {
        response = await axios.put (updateURL, input);
      } else {
        response = await axios.post (addURL, input, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: userToken,
          },
        });
      }

      console.log (response);
      const data = response.data;
      console.log ('post data');
      console.log (data);
      if (editFlag) {
        return {editFlag: true, editIndex, data: input, error: false};
      } else return {editFlag: false, data: input, error: false};
    } catch (error) {
      alert (error.message);

      if (error.response.data.verification === false) {
        console.log ('invalid token');
        alert ('invalid token');
        throw error; //now rejected will catch error
      }
      return {editFlag: false, error: true}; //it will go in fulfilled
    }
  }
);
const expenseSlice = createSlice ({
  name: 'expense',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchExpenses.fulfilled]: (state, action) => {
      state.expense = action.payload;
      state.isLoading = false;
      state.unAuthorize = false;
    },
    [fetchExpenses.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchExpenses.rejected]: (state, action) => {
      console.log ('Error occurred while fetching expenses:', action);
      state.isLoading = false;
      // Handle the error here or set a flag/error message in your state if needed
      state.unAuthorize = true;
    },
    //delete reducer
    [deleteExpense.fulfilled]: (state, action) => {
      console.log ('action.payload', action.payload);
      if (action.payload != -1) {
        // Create a new array without the deleted item using filter
        let newList = state.expense.filter (
          (item, index) => index !== action.payload
        );
        // state.expense = newList;
        return {...action, expense: newList};
      }
      // state.isLoading = false;
      //state.unAuthorize = false;
      return state;
    },

    [deleteExpense.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteExpense.rejected]: (state, action) => {
      console.log ('Error occurred while fetching expenses:', action);
      state.isLoading = false;
      // Handle the error here or set a flag/error message in your state if needed
      state.unAuthorize = true;
    },

    //adding updating reducer
    [addUpdate.fulfilled]: (state, action) => {
      if (!action.payload.error && !action.payload.editFlag) {
        //add data
        state.expense.push (action.payload.data);
        state.isLoading = false;
      } else if (!action.payload.error && action.payload.editFlag) {
        state.expense.splice (action.payload.editIndex, 1, action.payload.data);
        state.isLoading = false;
      } else {
        //action.payload.error=> true
        alert ('something went wrong try again');
        return state;
      }
    },
    [addUpdate.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addUpdate.rejected]: (state, action) => {
      state.isLoading = false;
      // Handle the error here or set a flag/error message in your state if needed
      state.unAuthorize = true;
    },
  }, //extra reducer end
});
export default expenseSlice.reducer;
