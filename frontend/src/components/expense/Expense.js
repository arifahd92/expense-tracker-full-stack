import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Expense() {
  const [list, setList] = useState([
    { id: 1, amount: "10000", catagory: "Movie", description: "Ujhh" },
    { id: 2, amount: "20000", catagory: "Movie", description: "Ujhh" },
    { id: 3, amount: "30000", catagory: "Movie", description: "Ujhh" },
  ]);
  const [editIndex, setEditIndex] = useState(-1);
  const [expenseId, setExpenseId] = useState(-1);
  const [editFlag, setEditFlag] = useState(false);
  const [input, setInput] = useState({
    amount: "",
    catagory: "",
    description: "",
  });
  const [showInput, setShowInput] = useState(false);
  const { userId } = useParams();
  const userEmail = localStorage.getItem("userEmail");
  useEffect(() => {
    const getExpense = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/get-expense/${userId}`
        );
        console.log(response);
        if (response.status !== 200) {
          alert("something went wrong");
        }
        console.log(response.data);
        setList(response.data);
      } catch (err) {
        alert(err.response.data.error);
      }
    };
    getExpense();
  }, []);
  const submitHandeler = async (e, ind = -1) => {
    e.preventDefault();
    try {
      let response;
      let addURL = `http://localhost:4000/add-expense/${userId}`;
      let updateURL = `http://localhost:4000/update-expense/${expenseId}`;
      if (editFlag) {
        response = await axios.put(updateURL, input);
      } else {
        response = await axios.post(addURL, input);
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
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };
  const handleinputchange = (e) => {
    let { id, value } = e.target;
    setInput({ ...input, [id]: value });
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
  return (
    <>
      <div className="container  container-sm mt-5 w-sm-75">
        <div className="row   ">
          <div className="col-8 text-warning  ">Welcome: {userEmail}</div>
          <div className="col  ">
            <button className="btn btn-warning  float-end  ">logout</button>
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
      <div className="container  bg-body-secondary">
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
                <button className="btn bg-danger float-end ">delete</button>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
}
