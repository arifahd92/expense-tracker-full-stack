import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
export default function ReportCard() {
  const [expense, setExpense] = useState([]);
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

        // setExpense(expense);
        console.log("from report card");
        //getting sorted and grouped data
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
      className={`leaderboardContainer border bg-info ${
        darkFlag && "bg-black text-info"
      } `}
      style={{
        position: "absolute",
        minHeight: "80vh",
        width: "100vw",
        top: "170px",
        zIndex: 5,
      }}
    >
      <div class="container bg-body-secondary table-responsive ">
        <h5>{""}'s report card </h5>

        <table class="table table-bordered">
          <thead>
            <tr className="p-2 ">
              <th>
                <div className="pt-2 pb-2 text-center list-group-item-success">
                  #
                </div>
              </th>
              <th>
                <div className="pt-2 pb-2 text-center">Catagory</div>
              </th>
              <th>
                <div className="pt-2 pb-2 text-center">Description</div>
              </th>
              <th>
                <div className="pt-2 pb-2 text-center">Expense</div>
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}
