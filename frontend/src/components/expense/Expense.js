import axios from "axios";
import React, { useState } from "react";

export default function Expense() {
  const [list, setList] = useState([
    { id: 1, amount: "10000", catagory: "Movie", description: "Ujhh" },
    { id: 2, amount: "20000", catagory: "Movie", description: "Ujhh" },
    { id: 3, amount: "30000", catagory: "Movie", description: "Ujhh" },
  ]);
  const [editId, setEditId] = useState(-1);
  const [editFlag, setEditFlag] = useState(false);
  const [input, setInput] = useState({
    amount: "",
    catagory: "",
    description: "",
  });
  const [showInput, setShowInput] = useState(false);
  const submitHandeler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/add-expense", input);
      if (!response.ok) {
        alert("something went wrong");
        return;
      }
      const data = response.data;
      setList(data);
    } catch (error) {
      alert(error.message);
    }
  };
  const handleinputchange = (e) => {
    let { id, value } = e.target;
    setInput({ ...input, [id]: value });
  };
  //************Up date ui **********
  const handleEdit = (ind, id) => {
    const target = list[ind];
    setInput(target);
    setEditId(id);
    setEditFlag(true);
    setShowInput(true);
  };
  return (
    <>
      <div className="container  container-sm mt-5 w-sm-75 ">
        <div className="row border  ">
          <div className="col border">welcome arif</div>
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
        <div className="container  mt-5  w-75  border-1 d-flex justify-content-center  ">
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
          <div className="col-2 border text-center ">
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
      <div className="container">
        {list.map((item, ind) => {
          return (
            <div className="row " key={ind}>
              <div className="col-1">{ind + 1}</div>
              <div className="col-2  border">{item.amount}$</div>
              <div className="col-2 border text-center">{item.catagory}</div>
              <div
                className="col-3 border d-flex flex-wrap "
                style={{ overflowX: "auto" }}
              >
                {item.description}
              </div>
              <div className="col-2 border ">
                <button
                  className="btn  btn-warning"
                  onClick={() => handleEdit(ind, item.id)}
                >
                  {" "}
                  edit
                </button>
              </div>
              <div className="col-2 border text-center ">
                <button className="btn btn-warning float-end ">delete</button>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
}
