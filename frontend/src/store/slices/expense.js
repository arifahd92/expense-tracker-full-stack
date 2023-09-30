import axios from "axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const initialState = {
  expense: [],
  isLoading: false,
  unAuthorize: false,
  total: 0,
};
//const userToken = localStorage.getItem("userToken");
// *******************fetching data action***************************************
export const fetchExpenses = createAsyncThunk(
  "getExpense",
  async (userToken) => {
    // console.log(userToken);
    try {
      const response = await axios.get(`http://localhost:4000/get-expense`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken,
        },
      });
      console.log("get data response inside fetch async");
      const data = response.data;
      const total = data.reduce(
        (accumulator, item) => accumulator + +item.amount,
        0
      );
      console.log({ total });
      return { data, total };
    } catch (error) {
      // Handle the error response here
      console.error("Error fetching expenses:", error.response.data);

      if (error.response.data.verification === false) {
        throw error;
        // Re-throw the error so it gets caught in the Redux slice
      }
    }
  }
);
//************deleting data action****************************************************
export const deleteExpense = createAsyncThunk(
  // it accepts only one args
  "delete expense",
  async (payload) => {
    try {
      const expenseId = payload.id;
      //setRequest(true);
      console.log(payload.id);
      console.log(payload.index);
      const response = await axios.delete(
        `http://localhost:4000/delete-expense/${expenseId}`
      );
      if (response.status != 200) {
        alert("some thing went wrong try again");
        return -1;
      }
      const data = await response.data;
      return payload.index;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
      if (error.response.data.verification === false) {
        console.log("invalid token");
        throw error;
      } else {
        return -1;
      }
    }
  }
);
//*********adding/updating action***********************************************************
export const addUpdate = createAsyncThunk(
  "addUpdate",
  async ({ expenseId, editFlag, editIndex, input, userToken }) => {
    try {
      let response;
      let addURL = `http://localhost:4000/add-expense`;
      let updateURL = `http://localhost:4000/update-expense/${expenseId}`;
      if (editFlag) {
        response = await axios.put(updateURL, input);
      } else {
        response = await axios.post(addURL, input, {
          headers: {
            Authorization: userToken,
          },
        });
      }

      console.log(response);
      const data = response.data;
      console.log("post data");
      console.log(data);
      if (editFlag) {
        return { editFlag: true, editIndex, data: input, error: false };
      } else {
        return { editFlag: false, data: input, error: false };
      }
    } catch (error) {
      alert(error.message);

      if (error.response.data.verification === false) {
        console.log("invalid token");
        alert("invalid token");
        throw error; //now rejected will catch error
      }
      return { editFlag: false, error: true }; //it will go in fulfilled, some random error happend
    }
  }
);
const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    clearExpenseState: (state, action) => {
      return {
        expense: [],
        isLoading: false,
        unAuthorize: false,
        total: 0,
      };
    },
  },
  extraReducers: {
    [fetchExpenses.fulfilled]: (state, action) => {
      state.expense = action.payload.data;
      state.isLoading = false;
      state.unAuthorize = false;
      state.total = action.payload.total;
    },
    [fetchExpenses.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchExpenses.rejected]: (state, action) => {
      console.log("Error occurred while fetching expenses:", action);
      state.isLoading = false;
      // Handle the error here or set a flag/error message in your state if needed
      state.unAuthorize = true;
    },
    //delete reducer
    [deleteExpense.fulfilled]: (state, action) => {
      console.log("action.payload", action.payload);
      if (action.payload != -1) {
        // Create a new array without the deleted item using filter
        let newList = state.expense.filter(
          (item, index) => index !== action.payload
        );
        const total = newList.reduce(
          (accumulator, item) => accumulator + +item.amount,
          0
        );
        // state.expense = newList;
        return {
          ...action,
          expense: newList,
          unAuthorize: false,
          total: total,
        };
      }
      // state.isLoading = false;
      //state.unAuthorize = false;
      return state;
    },

    [deleteExpense.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteExpense.rejected]: (state, action) => {
      console.log("Error occurred while fetching expenses:", action);
      state.isLoading = false;
      // Handle the error here or set a flag/error message in your state if needed
      state.unAuthorize = true;
    },

    //adding updating reducer
    [addUpdate.fulfilled]: (state, action) => {
      if (!action.payload.error && !action.payload.editFlag) {
        //add data
        state.expense.push(action.payload.data);
        state.isLoading = false;
        state.unAuthorize = false;
        state.total = +state.total + +action.payload.data.amount;
      } else if (!action.payload.error && action.payload.editFlag) {
        const index = action.payload.editIndex;
        const newItem = action.payload.data;
        const sub = +state.expense[index].amount;
        const add = +newItem.amount;
        const nett = add - sub;
        console.log({ add, sub, nett });
        state.expense.splice(index, 1, newItem);
        state.isLoading = false;
        state.unAuthorize = false;
        state.total = +state.total + nett;
      } else {
        //action.payload.error=> true
        alert("something went wrong try again");
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
export const { clearExpenseState } = expenseSlice.actions;
export default expenseSlice.reducer;
