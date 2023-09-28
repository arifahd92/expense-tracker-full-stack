import axios from "axios";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

export default function Expense() {
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [expenseId, setExpenseId] = useState(-1);
  const [editFlag, setEditFlag] = useState(false);
  const [request, setRequest] = useState(false);
  const [input, setInput] = useState({
    amount: "",
    catagory: "",
    description: "",
  });
  const [showInput, setShowInput] = useState(false);
  const { userId } = useParams();
  const userEmail = localStorage.getItem("userEmail");
  const userToken = localStorage.getItem("userToken");
  const navigate = useNavigate();
  useEffect(() => {
    const getExpense = async () => {
      try {
        setRequest(true);
        const response = await axios.get(`http://localhost:4000/get-expense`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: userToken,
          },
        });
        console.log("get data response");
        console.log(response);
        if (response.status !== 200) {
          alert("something went wrong");
          setRequest(false);
        }
        console.log(response.data);
        setList(response.data);
        setRequest(false);
      } catch (err) {
        if (err.response.data.verification === false) {
          console.log("invalid token");
          navigate("/");
        }
        alert(err.response.data.error);
      }
    };
    if (userToken) {
      getExpense();
    } else {
      navigate("/");
    }
  }, []);
  //handle changes in input fields
  const handleinputchange = (e) => {
    let { id, value } = e.target;
    setInput({ ...input, [id]: value });
  };
  // submit form data add/update**************
  const submitHandeler = async (e, ind = -1) => {
    e.preventDefault();
    try {
      setRequest(true);
      let response;
      let addURL = `http://localhost:4000/add-expense`;
      let updateURL = `http://localhost:4000/update-expense/${expenseId}`;
      if (editFlag) {
        response = await axios.put(updateURL, input);
      } else {
        response = await axios.post(addURL, input, {
          headers: {
            "Content-Type": "application/json",
            Authorization: userToken,
          },
        });
      }

      console.log(response);
      const data = response.data;
      console.log("post data");
      console.log(data);
      const updated = [...list, data];
      setList(updated);
      if (editFlag) {
        const updated = [...list];
        updated[editIndex] = input;
        setList(updated);
        setEditFlag(false);
        setExpenseId(-1);
        setEditIndex(-1);
      }
      setInput({ amount: "", catagory: "", description: "" });
      setRequest(false);
    } catch (error) {
      alert(error.message);
      if (error.response.data.verification === false) {
        console.log("invalid token");
        setRequest(false);
        navigate("/");
      }
    }
  };

  //************Update ui **********
  const handleEdit = (ind, id) => {
    const target = list[ind];
    setInput(target);
    setExpenseId(id);
    setEditFlag(true);
    setShowInput(true);
    setEditIndex(ind);
  };

  //delete expense
  const handleDelete = async (id, index) => {
    console.log("i got clicked");
    try {
      const confirm = window.confirm(
        "Are you sure data will be deleted permanently?"
      );
      if (!confirm) {
        return;
      }
      const expenseId = id;
      setRequest(true);
      const response = await axios.delete(
        `http://localhost:4000/delete-expense/${expenseId}`
      );
      if (response.status != 200) {
        alert("some thing went wrong try again");
        setRequest(false);
        return;
      }
      const data = await response.data;
      let updated = [...list];
      updated.splice(index, 1);
      setList(updated);
      setRequest(false);
    } catch (error) {
      console.log(error.message);
      setRequest(false);
      alert(error.message);
      if (error.response.data.verification === false) {
        console.log("invalid token");
        navigate("/");
      }
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userToken");
    navigate("/");
  };
  return (
    <>
      <div className="container  container-sm mt-5 w-sm-75">
        <div className="row   ">
          <div className="col-8 text-warning  ">{userEmail}</div>
          <div className="col  ">
            <button
              className="btn btn-warning  float-end"
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="container mt-1 w-sm-75  ">
        <div className="row d-flex justify-content-end ">
          <div className="col-4 ">
            <button
              type="button "
              className="btn btn-secondary float-end "
              onClick={() => setShowInput(!showInput)}
            >
              {!showInput ? "+Add Expense" : "Close"}
            </button>
          </div>
        </div>
      </div>
      {showInput && (
        <div className="container  mt-5  w-75  border-1 d-flex justify-content-center bg-body-secondary   ">
          <form
            className="mt-4 row "
            style={{ width: "80%" }}
            onSubmit={submitHandeler}
          >
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
                id="catagory"
                onChange={handleinputchange}
                value={input.catagory}
              >
                <option disabled value="">
                  Select an option
                </option>
                <option value="Movie">Movie</option>
                <option value="Shopping">Shopping </option>
                <option value="Rent">Rent</option>
                <option value="Groccery">Groccery</option>
              </select>
            </div>
            <div className="text-center d-flex  justify-content-center ">
              <button
                type="submit"
                className="btn btn btn-primary d-block w-50 "
              >
                {editFlag ? "update" : "add"}
              </button>
            </div>
          </form>
        </div>
      )}
      <div className=" container  container-sm-fluid mt-5 ">
        <div className="row ">
          <div className="col-1">
            <h6>#</h6>
          </div>
          <div className="col-2 ">
            <h6>Expense</h6>
          </div>
          <div className="col-2  text-center ">
            <h6>Catagory</h6>
          </div>
          <div className="col-3">
            <h6>Description</h6>
          </div>
          <div className="col-2  ">
            <h6>edit</h6>
          </div>
          <div className="col-2 text-center float-end">
            <h6 className="float-end">delete</h6>
          </div>
        </div>
        <div className="row  border border-dark"></div>
      </div>
      {list.length === 0 && (
        <div className="container pt-5 ">
          <div className="row  ">
            <div class="alert alert-warning text-bg-info text-center  ">
              no expense found, add some expense...
            </div>
          </div>
        </div>
      )}
      {request && <LoadingSpinner />}
      <div className="container  bg-body-secondary ">
        {list.map((item, ind) => {
          return (
            <div className="row " key={ind}>
              <div className="col-1">{ind + 1}</div>
              <div className="col-2  ">{item.amount}$</div>
              <div className="col-2  text-center">{item.catagory}</div>
              <div
                className="col-3  d-flex flex-wrap "
                style={{ overflowX: "auto" }}
              >
                {item.description}
              </div>
              <div className="col-2  ">
                <button
                  className="btn  btn-warning"
                  onClick={() => handleEdit(ind, item.id)}
                >
                  {" "}
                  edit
                </button>
              </div>
              <div className="col-2  text-center ">
                <button
                  onClick={() => handleDelete(item.id, ind)}
                  className="btn bg-danger float-end "
                >
                  delete
                </button>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
}
