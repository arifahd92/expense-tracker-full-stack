import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";
export default function ReportCard() {
  const [report, setReport] = useState([]);
  //const {premium}= useSelector((state)=>)
  const { darkFlag, premium } = useSelector((state) => state.user);
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
        alert("Add atleast two expense  ");
      }
    };
    fetchUser();
  }, []);
  const downloadReport = () => {
    if (!premium) {
      return alert("Only for premium user");
    }
    const csvData = convertToCSV(report);

    const csvBlob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(csvBlob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "report.csv";
    a.click();

    // Clean up by revoking the URL.
    window.URL.revokeObjectURL(url);
  };

  // Function to convert JSON data to CSV format.
  const convertToCSV = (data) => {
    const header = Object.keys(data[0]).join(",");
    const rows = data.map((row) => Object.values(row).join(","));
    return [header, ...rows].join("\n");
  };

  return (
    <div
      className={`leaderboardContainer border  ${
        darkFlag && "bg-black text-info"
      } `}
      style={{
        position: "absolute",
        minHeight: "80vh",
        width: "100vw",
        top: "170px",
        zIndex: 5,
        backgroundColor: "GrayText",
      }}>
      {report.length >= 4 && (
        <div
          class="container bg-body-secondary table-responsive border border-danger  "
          style={{
            minHeight: "calc(100vh - 100px)",
          }}>
          <div className="container">
            <div className="row">
              <div className=" col m-4 text-primary">
                {report[0]?.name}'s Report Card
              </div>
              <div className=" col m-4 text-primary ">{report[0]?.email}</div>
              <div className=" col m-4 d-flex justify-content-between  ">
                <div className="text-primary">
                  {" "}
                  Total Expense: {report[0]?.total}${" "}
                </div>
                <div>
                  <button
                    className="btn btn-outline-primary "
                    onClick={downloadReport}>
                    download
                  </button>
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
              {report.length >= 4 &&
                report.map((item, ind) => {
                  console.log({item})
                  return (
                    <tr key={item._id} className="text-center ">
                      {ind != 0 && item._id  && (
                        <>
                          <td>#</td>
                          <td>{item.category}</td>
                          <td>{item.description}</td>
                          <td>{item.amount}$</td>
                        </>
                      )}
                      {ind != 0 && !item._id && (
                        <>
                          <td></td>
                          <td className=" text-info">
                            Total Expense Of {Object.keys(item)[0]}
                          </td>
                          <td></td>
                          <td className=" text-info ">
                            {Object.values(item)[0]}$
                          </td>
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
      )}
      {report.length < 4 && (
        <div class="alert alert-warning text-bg-info text-center  ">
          Add atleast 2 expenses...
        </div>
      )}
    </div>
  );
}
