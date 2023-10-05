import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
export default function ReportCard() {
  const [report, setReport] = useState([]);
  const [count, setCount] = useState(1);
  const { darkFlag } = useSelector((state) => state.user);
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/premium/report-card",
          {
            headers: {
              Authorization: userToken,
            },
          }
        );
        const data = response.data;

        console.log("from report card");
        setReport(data);
        console.log(data);
        //setUser(userInfo);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchUser();
  }, []);
  return (
    <div
      className={`leaderboardContainer border  ${
        darkFlag && "bg-black text-info"
      } `}
      style={{
        position: "absolute",
        minHeight: "80vh",
        width: "100vw",
        top: "100px",
        zIndex: 5,
        backgroundColor: "GrayText",
      }}
    >
      <div
        class="container bg-body-secondary table-responsive border border-danger  "
        style={{
          minHeight: "calc(100vh - 100px)",
        }}
      >
        <div className="container">
          <div className="row">
            <div className=" col m-4 text-lg">
              <h5>
                <small className="text-primary">
                  {report[0]?.name}'s report card{" "}
                </small>
              </h5>
            </div>
            <div className=" col m-4 text-primary ">{report[0]?.email}</div>
            <div className=" col m-4 d-flex justify-content-between  ">
              <div className="text-primary">
                {" "}
                Total Expense: {report[0]?.total}${" "}
              </div>
              <div>
                <button className="btn btn-outline-primary ">download</button>
              </div>
            </div>
          </div>
        </div>

        <table class="table table-bordered ">
          <thead>
            <tr className="p-3 ">
              <th>
                <div className="pt-1 pb-1 text-center ">#</div>
              </th>
              <th>
                <div className="pt-1 pb-1 text-center">Catagory</div>
              </th>
              <th>
                <div className="pt-1 pb-1 text-center">Description</div>
              </th>
              <th>
                <div className="pt-1 pb-1 text-center">Expense</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {report.map((item, ind) => {
              return (
                <tr key={item.id} className="text-center ">
                  {ind != 0 && item.id && (
                    <>
                      <td>#</td>
                      <td>{item.category}</td>
                      <td>{item.description}</td>
                      <td>{item.amount}$</td>
                    </>
                  )}
                  {ind != 0 && !item.id && (
                    <>
                      <td></td>
                      <td className=" text-info">
                        Total Expense Of {Object.keys(item)[0]}
                      </td>
                      <td></td>
                      <td className=" text-info ">{Object.values(item)[0]}$</td>
                    </>
                  )}
                </tr>
              );
            })}
            <tr className="text-center ">
              <>
                <td></td>
                <td className=" text-warning bg-light ">Total Expence</td>
                <td></td>
                <td className=" text-warning bg-black  ">
                  {report[0]?.total}$
                </td>
              </>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
