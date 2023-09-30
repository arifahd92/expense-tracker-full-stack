import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Leaderboard() {
  const userToken = localStorage.getItem("userToken");
  const [users, setUsers] = useState([
    { name: "arif", total: 30 },
    { name: "arif", total: 30 },
  ]);
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/leader-board", {
          headers: {
            Authorization: userToken,
          },
        });
        const users = response.data;
        const totalAmountArr = [];
        users.forEach((element) => {
          let sum = 0;
          element.expenses.forEach((expense) => {
            sum += +expense.amount;
          });
          totalAmountArr.push(sum);
        });
        console.log(totalAmountArr);

        let updatedUser = [];

        for (let i = 0; i < users.length; i++) {
          const dummy = { ...users[i], total: totalAmountArr[i] };

          updatedUser = [...updatedUser, dummy];
        }
        updatedUser.sort((a, b) => b.total - a.total);
        setUsers(updatedUser);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchUser();
  }, []);
  return (
    <div
      className="leaderboardContainer border bg-info "
      style={{
        position: "absolute",
        minHeight: "80vh",
        width: "100vw",
        top: "148px",
      }}
    >
      <div className="container">
        <div className="row  border-bottom-5 ">
          <h4 className=" d-flex justify-content-center bg-info bg-secondary-subtle p-2 ">
            LEADER BOARD
          </h4>
        </div>
        <div className="row bg-body-secondary p-2 mb-2">
          <div className="col">
            <h6>Rank</h6>
          </div>
          <div className="col d-flex justify-content-center">
            <h6>User Name</h6>
          </div>
          <div className="col d-flex justify-content-end ">
            <h6>Total Expense</h6>
          </div>
        </div>

        {users.length > 0 &&
          users.map((user, ind) => {
            return (
              <div className="row bg-body-tertiary border mb-2 p-2">
                <div className="col  "># {ind + 1}</div>
                <div className="col d-flex justify-content-center ">
                  {user.name}
                </div>
                <div className="col d-flex justify-content-end ">
                  {user.total} $
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
