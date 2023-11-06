import axios from "axios";
import TablePagination from "@mui/material/TablePagination";
//import Razorpay from "razorpay";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import {
  addUpdate,
  deleteExpense,
  fetchExpenses,
} from "../../store/slices/expense";
import Leaderboard from "./Leaderboard";
import Header from "./Header";
import ReportCard from "./ReportCard";

export default function Expense() {
  const [editIndex, setEditIndex] = useState(-1);
  const [expenseId, setExpenseId] = useState(-1);
  const [editFlag, setEditFlag] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [input, setInput] = useState({
    amount: "",
    category: "",
    description: "",
  });
  const [showInput, setShowInput] = useState(false);
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();
  // useSelctor*******************
  const { expense, isLoading, unAuthorize, total, totalRecords } = useSelector(
    (state) => state.expense
  );
  const { boardFlag, darkFlag, reportFlag } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  let userToken = localStorage.getItem("userToken");
  console.log({ page });
  useEffect(() => {
    console.log("expense got re mounted");
    userToken = localStorage.getItem("userToken");
    console.log("useEffect of expense ");
    const getExpense = () => {
      console.log(
        "get expense called*******************************************************"
      );
      dispatch(fetchExpenses({ userToken, page, rowsPerPage }));
      //console.log({ expense });
    };
    // getExpense();
    if (!unAuthorize) {
      // valid user
      getExpense();

      return;
    }
  }, [page, rowsPerPage]);

  console.log({ expense });
  //handle changes in input fields
  const handleinputchange = (e) => {
    let { id, value } = e.target;
    setInput({ ...input, [id]: value });
  };
  // submit form data add/update**************
  const submitHandeler = async (e, ind = -1) => {
    e.preventDefault();
    const userToken = localStorage.getItem("userToken");
    dispatch(
      addUpdate({
        expenseId,
        editFlag,
        editIndex,
        input,
        userToken,
        totalRecords,
      })
    );
    setInput({
      amount: "",
      category: "",
      description: "",
    });
    setExpenseId(-1);
    setEditFlag(false);
    setEditIndex(-1);
    if (unAuthorize) {
      handleLogout();
    }
  };

  //************Update ui **********
  const handleEdit = (ind, id) => {
    const target = expense[ind];
    setInput(target);
    setExpenseId(id);
    setEditFlag(true);
    setShowInput(true);
    setEditIndex(ind);
  };

  //delete expense
  const handleDelete = (index, id) => {
    const userToken = localStorage.getItem("userToken");
    console.log("i got clicked");
    console.log({ id, index });
    // try {
    const confirm = window.confirm(
      "Are you sure data will be deleted permanently?"
    );
    if (!confirm) {
      return;
    }

    dispatch(deleteExpense({ index, id, userToken, totalRecords })); // only one argument is accepted
  };
  function handleLogout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userToken");
    navigate("/");
  }
  const handleChangePage = (event, newPage) => {
    console.log("handle change page");
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("first");
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Header />
      {boardFlag && <Leaderboard />}
      {reportFlag && <ReportCard />}

      {showInput && (
        <div
          className={`container  mt-5   d-flex justify-content-center  ${
            darkFlag && "bg-black "
          }`}>
          <div className="row">
            <div className="col-md-10 offset-md-1 col-lg-8   offset-lg-2 text-secondary">
              <form
                className={`mt-4 row ${darkFlag && "bg-black"}`}
                onSubmit={submitHandeler}>
                <div className="mb-3 ">
                  <label htmlFor="amount" className="form-label">
                    amount:
                  </label>
                  <input
                    required
                    type="number"
                    className="form-control"
                    id="amount"
                    placeholder="Enter amount"
                    min={0}
                    value={input.amount}
                    onChange={handleinputchange}
                  />
                </div>
                <div className="mb-3 ">
                  <label htmlFor="description" className="form-label">
                    description:
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Enter description"
                    value={input.description}
                    onChange={handleinputchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleSelect" className="form-label">
                    Select an option:
                  </label>
                  <select
                    required
                    className="form-select"
                    id="category"
                    onChange={handleinputchange}
                    value={input.category}>
                    <option disabled value="">
                      Select an option
                    </option>
                    <option value="Movie">Movie</option>
                    <option value="Shopping">Shopping </option>
                    <option value="Rent">Rent</option>
                    <option value="Groccery">Groccery</option>
                  </select>
                </div>
                <div className="text-center mt-3 d-flex  justify-content-center ">
                  <button
                    type="submit"
                    className="btn btn btn-primary d-block w-100 ">
                    {editFlag ? "update" : "add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="container mt-1 w-sm-75  ">
        <div className="row d-flex justify-content-end ">
          <div className="col-4 ">
            <button
              type="button "
              className="btn btn-secondary float-end "
              onClick={() => setShowInput(!showInput)}>
              {!showInput ? "+Add Expense" : "Close"}
            </button>
          </div>
        </div>
      </div>
      <hr className="text-warning" />

      {expense.length === 0 && (
        <div
          className={`container text-black pt-5  ${
            darkFlag && "bg-black text-white"
          }`}>
          <div className="row  ">
            <div class="alert alert-warning text-bg-info text-center  ">
              no expense found, add some expense...
            </div>
          </div>
        </div>
      )}
      {isLoading && <LoadingSpinner />}
      {expense.length > 0 && (
        <div className=" container  container-sm-fluid mt-5 border table-responsive bg-gradient text-white   ">
          <table className="table table-bordered bg-gradient table-striped  ">
            <tr className="p-2 ">
              <th>
                <div className="pt-2 pb-2 text-center">#</div>
              </th>
              <th>
                <div className="pt-2 pb-2 text-center">Expense</div>
              </th>
              <th>
                <div className="pt-2 pb-2 text-center">Catagory</div>
              </th>
              <th>
                <div className="pt-2 pb-2 text-center">Description</div>
              </th>
              <th>
                <div className="pt-2 pb-2 text-center">edit</div>
              </th>
              <th>
                <div className="pt-2 pb-2 text-center">delete</div>
              </th>
            </tr>

            {expense.length > 0 &&
              expense.map((item, ind) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <div className="text-center pt-3 pb-2  ">
                        {ind + 1 + page * rowsPerPage})
                      </div>
                    </td>
                    <td>
                      <div className="text-center pt-3 pb-2">
                        {item.amount}$
                      </div>
                    </td>
                    <td>
                      <div className="text-center pt-3 pb-2 w-100 ">
                        {item.category}
                      </div>
                    </td>
                    <td>
                      <div className="text-center pt-3 pb-2">
                        {item.description}
                      </div>
                    </td>
                    <td>
                      <div className="text-center pt-2 pb-1">
                        <button
                          disabled={isLoading}
                          className="btn  bg-warning "
                          onClick={() => handleEdit(ind, item.id)}>
                          edit
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="text-center pt-2 pb-1 ">
                        <button
                          disabled={isLoading || editFlag}
                          onClick={() => handleDelete(ind, item.id)}
                          className="btn bg-danger ">
                          delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      )}
      {expense.length > 0 && (
        <div className="container ">
          <div className="row bg-info p-2">
            <div className="col float-start text-white">Total Of Expense</div>
            <div className="col   d-flex justify-content-end text-white ">
              $ {total}
            </div>
          </div>

          <div className="row border border-danger bg-secondary">
            <TablePagination
              component="div"
              count={totalRecords}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      )}
    </>
  );
}
